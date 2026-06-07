const fetch = require("node-fetch");

exports.handler = async (event) => {
    const { code, state } = event.queryStringParameters || {};

    if (!code) {
        return { statusCode: 400, body: "Missing authorization code" };
    }

    try {
        // Step 1: Exchange code for LinkedIn access token
        const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            }),
        });
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // Step 2: Fetch LinkedIn user profile
        const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await profileRes.json();

        // Step 3: Mint Firebase custom token using Admin SDK
        const admin = require("firebase-admin");

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                }),
            });
        }

        const uid = `linkedin:${profile.sub}`;
        const customToken = await admin.auth().createCustomToken(uid, {
            email: profile.email,
            name: profile.name,
            picture: profile.picture,
        });

        // Step 4: Save user to Firestore if new
        const userRef = admin.firestore().doc(`users/${uid}`);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            await userRef.set({
                email: profile.email,
                displayName: profile.name,
                photoURL: profile.picture,
                role: "shurveer",
                verified: false,
                emailVerified: true,
                createdAt: new Date().toISOString(),
                provider: "linkedin",
            });
        }

        // Step 5: Return HTML that posts the token back to the opener and closes
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/html" },
            body: `
        <html><body><script>
          window.opener.postMessage({ customToken: "${customToken}" }, "${process.env.APP_ORIGIN}");
          window.close();
        </script></body></html>
      `,
        };
    } catch (err) {
        console.error("LinkedIn auth error:", err);
        return { statusCode: 500, body: "Authentication failed" };
    }
};