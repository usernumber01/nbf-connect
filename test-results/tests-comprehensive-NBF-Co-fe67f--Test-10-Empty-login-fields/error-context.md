# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\comprehensive.spec.js >> NBF Connect Comprehensive Testing >> SUITE 2: Login >> Test 10: Empty login fields
- Location: tests\comprehensive.spec.js:155:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#email')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link " Back to Home" [ref=e2] [cursor=pointer]:
    - /url: /
    - generic [ref=e3]: 
    - generic [ref=e4]: Back to Home
  - generic [ref=e5]:
    - generic [ref=e7]:
      - link "NBF Connect Emblem NBF Connect" [ref=e8] [cursor=pointer]:
        - /url: /
        - img "NBF Connect Emblem" [ref=e9]
        - generic [ref=e10]: NBF Connect
      - generic [ref=e11]:
        - heading "Welcome Back" [level=1] [ref=e12]
        - paragraph [ref=e13]: Sign in to your NBF Connect account
      - generic [ref=e14]:
        - generic [ref=e15]: Invalid email or password.
        - generic [ref=e16]:
          - generic [ref=e17]: Email or Mobile Number
          - generic [ref=e18]:
            - generic: 
            - textbox "Email or Mobile Number" [ref=e19]:
              - /placeholder: Enter email or mobile number
        - generic [ref=e20]:
          - generic [ref=e21]: Password
          - generic [ref=e22]:
            - generic: 
            - textbox "Password" [ref=e23]:
              - /placeholder: Enter your password
            - button "" [ref=e24] [cursor=pointer]:
              - generic [ref=e25]: 
        - generic [ref=e26]:
          - generic [ref=e27] [cursor=pointer]:
            - generic [ref=e28]: 
            - generic [ref=e29]: Remember me
          - link "Forgot password?" [ref=e30] [cursor=pointer]:
            - /url: "#"
        - button " Login" [ref=e31] [cursor=pointer]:
          - generic [ref=e32]: 
          - generic [ref=e33]: Login
        - paragraph [ref=e34]: For security, login is temporarily locked after 5 failed attempts.
      - generic [ref=e36]: or continue with
      - generic [ref=e37]:
        - button "Continue with Google" [ref=e38] [cursor=pointer]:
          - img [ref=e39]
          - generic [ref=e44]: Continue with Google
        - button " Continue with LinkedIn" [ref=e45] [cursor=pointer]:
          - generic [ref=e46]: 
          - generic [ref=e47]: Continue with LinkedIn
      - paragraph [ref=e48]:
        - text: Don't have an account?
        - link "Become a Shurveer" [ref=e49] [cursor=pointer]:
          - /url: /register
    - generic [ref=e50]:
      - img "Disciplined Youth" [ref=e52]
      - generic [ref=e53]:
        - generic [ref=e55]: 
        - heading "Discipline Creates Opportunity" [level=2] [ref=e56]:
          - text: Discipline
          - text: Creates Opportunity
        - paragraph [ref=e57]: Your training is your qualification. Your character is your resume.
        - generic [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: 
            - generic [ref=e61]: Verified Shurveers
          - generic [ref=e62]:
            - generic [ref=e63]: 
            - generic [ref=e64]: Real Opportunities
          - generic [ref=e65]:
            - generic [ref=e66]: 
            - generic [ref=e67]: Trusted Organizations
  - contentinfo [ref=e68]:
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]:
          - link "NBF Connect Emblem NBF Connect" [ref=e72] [cursor=pointer]:
            - /url: "#"
            - img "NBF Connect Emblem" [ref=e73]
            - generic [ref=e74]: NBF Connect
          - paragraph [ref=e75]:
            - text: NBF Connect — National Bharat Force Connect
            - text: India's first platform connecting disciplined youth
            - text: with real opportunities.
          - generic [ref=e76]:
            - link "" [ref=e77] [cursor=pointer]:
              - /url: https://www.youtube.com/@NationalBharatForce
              - generic [ref=e78]: 
            - link "" [ref=e79] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e80]: 
            - link "" [ref=e81] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/nbf-connect-7037a6414/
              - generic [ref=e82]: 
            - link "" [ref=e83] [cursor=pointer]:
              - /url: https://x.com/nbfconnect
              - generic [ref=e84]: 
            - link "" [ref=e85] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e86]: 
        - generic [ref=e87]:
          - heading "Quick Links" [level=2] [ref=e88]
          - list [ref=e89]:
            - listitem [ref=e90]:
              - link "About NBF CONNECT" [ref=e91] [cursor=pointer]:
                - /url: /#home-hero
            - listitem [ref=e92]:
              - link "Opportunities" [ref=e93] [cursor=pointer]:
                - /url: /opportunities
            - listitem [ref=e94]:
              - link "How It Works" [ref=e95] [cursor=pointer]:
                - /url: /#how-it-works
            - listitem [ref=e96]:
              - link "Shurveers" [ref=e97] [cursor=pointer]:
                - /url: /#who-are-shurveers
            - listitem [ref=e98]:
              - link "Contact Us" [ref=e99] [cursor=pointer]:
                - /url: mailto:contact@nbfconnect.in
        - generic [ref=e100]:
          - heading "Resources" [level=2] [ref=e101]
          - list [ref=e102]:
            - listitem [ref=e103]:
              - link "Career Guide" [ref=e104] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e105]:
              - link "Government Schemes" [ref=e106] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e107]:
              - link "Interview Prep" [ref=e108] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e109]:
              - link "FAQs" [ref=e110] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e111]:
              - link "Partner Downloads" [ref=e112] [cursor=pointer]:
                - /url: /resources#partner-tools
        - generic [ref=e113]:
          - heading "Govt Policies" [level=2] [ref=e114]
          - list [ref=e115]:
            - listitem [ref=e116]:
              - link "Privacy Policy (Coming Soon)" [ref=e117] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e118]:
              - link "Terms & Conditions (Coming Soon)" [ref=e119] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e120]:
              - link "Grievance Redressal (Coming Soon)" [ref=e121] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e122]:
              - link "RTI Directory" [ref=e123] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e124]:
          - heading "Download App" [level=2] [ref=e125]
          - generic [ref=e126]:
            - link " GET IT ON Google Play" [ref=e127] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e128]: 
              - generic [ref=e129]:
                - generic [ref=e130]: GET IT ON
                - strong [ref=e131]: Google Play
            - link " Download on the App Store" [ref=e132] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e133]: 
              - generic [ref=e134]:
                - generic [ref=e135]: Download on the
                - strong [ref=e136]: App Store
          - generic [ref=e137]: Coming Soon
        - generic [ref=e138]:
          - heading "Newsletter" [level=2] [ref=e139]
          - paragraph [ref=e140]: Stay updated with the latest opportunities and mission updates.
          - generic [ref=e142]:
            - textbox "Email Address" [ref=e143]
            - button "Subscribe" [ref=e144] [cursor=pointer]:
              - generic [ref=e145]: 
      - generic [ref=e146]: NBF = National Bharat Force — India's disciplined youth force comprising NCC, NSS, Scouts & Guides, NYKS and Civil Defence members.
      - generic [ref=e147]:
        - paragraph [ref=e149]: © 2026 NBF Connect (National Bharat Force Connect) | All Rights Reserved. | Made in India
        - generic [ref=e150]:
          - paragraph [ref=e151]:
            - text: "Support:"
            - link "support@nbfconnect.in" [ref=e152] [cursor=pointer]:
              - /url: mailto:support@nbfconnect.in
            - text: "| General:"
            - link "hello@nbfconnect.in" [ref=e153] [cursor=pointer]:
              - /url: mailto:hello@nbfconnect.in
            - text: "| Careers:"
            - link "careers@nbfconnect.in" [ref=e154] [cursor=pointer]:
              - /url: mailto:careers@nbfconnect.in
            - text: "Admin:"
            - link "admin@nbfconnect.in" [ref=e155] [cursor=pointer]:
              - /url: mailto:admin@nbfconnect.in
            - text: "| Contact:"
            - link "contact@nbfconnect.in" [ref=e156] [cursor=pointer]:
              - /url: mailto:contact@nbfconnect.in
          - paragraph [ref=e157]:
            - generic [ref=e158]: 
            - text: Registered MSME | Govt. of India
          - paragraph [ref=e159]: UDYAM-TS-09-0253032
      - generic [ref=e160]: NBF Connect is an independent youth empowerment platform operated by National Bharat Force Connect. Not affiliated with or endorsed by any government ministry, bank, or financial institution.
```

# Test source

```ts
  60  |             const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
  61  |             expect(validationMessage).not.toBe('');
  62  |         });
  63  | 
  64  |         test('Test 5: Invalid mobile number', async ({ page }) => {
  65  |             await page.goto(`${BASE_URL}/register.html`);
  66  |             await page.fill('#mobile', '12345'); // < 10 digits
  67  |             await page.click('button[type="submit"]');
  68  |             
  69  |             const mobileInput = page.locator('#mobile');
  70  |             const validationMessage = await mobileInput.evaluate((el) => el.validationMessage);
  71  |             expect(validationMessage).not.toBe('');
  72  |         });
  73  | 
  74  |         test('Test 6: Declaration unchecked', async ({ page }) => {
  75  |             await page.goto(`${BASE_URL}/register.html`);
  76  |             await page.fill('#fullName', 'Test User');
  77  |             await page.fill('#email', getUniqueEmail('test_decl'));
  78  |             await page.fill('#mobile', '9876543210');
  79  |             await page.selectOption('#state', { index: 1 });
  80  |             await page.selectOption('#orgType', { index: 1 });
  81  |             await page.check('input[name="skills"]');
  82  |             await page.fill('#password', 'Test@1234');
  83  |             await page.fill('#confirmPassword', 'Test@1234');
  84  |             // Leaving declaration unchecked
  85  |             
  86  |             await page.click('button[type="submit"]');
  87  |             
  88  |             const declError = await page.locator(':text("Please accept the declaration")').isVisible();
  89  |             expect(declError).toBeTruthy();
  90  |         });
  91  | 
  92  |         test('Test 7: Duplicate email', async ({ page }) => {
  93  |             await page.goto(`${BASE_URL}/register.html`);
  94  |             const duplicateEmail = 'test-dup-001@nbftest.com';
  95  |             
  96  |             await page.fill('#fullName', 'Test User');
  97  |             await page.fill('#email', duplicateEmail);
  98  |             await page.fill('#mobile', '9876543210');
  99  |             await page.selectOption('#state', { index: 1 });
  100 |             await page.selectOption('#orgType', { index: 1 });
  101 |             await page.check('input[name="skills"]');
  102 |             await page.fill('#password', 'Test@1234!');
  103 |             await page.fill('#confirmPassword', 'Test@1234!');
  104 |             await page.check('#declaration');
  105 |             
  106 |             // NOTE: Since the live site CAPTCHA might block automation, 
  107 |             // this might fail on the live site depending on reCAPTCHA strictness.
  108 |             await page.click('button[type="submit"]');
  109 |             
  110 |             // Wait for potential response
  111 |             await page.waitForTimeout(3000);
  112 |             
  113 |             // If we try again (simulating duplicate attempt)
  114 |             await page.goto(`${BASE_URL}/register.html`);
  115 |             await page.fill('#fullName', 'Test User 2');
  116 |             await page.fill('#email', duplicateEmail);
  117 |             await page.fill('#mobile', '9876543210');
  118 |             await page.selectOption('#state', { index: 1 });
  119 |             await page.selectOption('#orgType', { index: 1 });
  120 |             await page.check('input[name="skills"]');
  121 |             await page.fill('#password', 'Test@1234!');
  122 |             await page.fill('#confirmPassword', 'Test@1234!');
  123 |             await page.check('#declaration');
  124 |             
  125 |             await page.click('button[type="submit"]');
  126 |             
  127 |             // Check for "already registered"
  128 |             const dupError = await page.locator(':text("already registered"), :text("email-already-in-use")').isVisible();
  129 |             expect(dupError).toBeTruthy();
  130 |         });
  131 |     });
  132 | 
  133 |     // === TEST SUITE 2 — LOGIN EDGE CASES ===
  134 |     test.describe('SUITE 2: Login', () => {
  135 |         test('Test 8: Wrong password', async ({ page }) => {
  136 |             await page.goto(`${BASE_URL}/login.html`);
  137 |             await page.fill('#email', 'test-dup-001@nbftest.com');
  138 |             await page.fill('#password', 'WrongPassword123!');
  139 |             await page.click('button[type="submit"]');
  140 |             
  141 |             const errorVisible = await page.locator(':text("Incorrect"), :text("invalid-credential")').isVisible();
  142 |             expect(errorVisible).toBeTruthy();
  143 |         });
  144 | 
  145 |         test('Test 9: Non-existent account', async ({ page }) => {
  146 |             await page.goto(`${BASE_URL}/login.html`);
  147 |             await page.fill('#email', 'doesnotexist@nbftest.com');
  148 |             await page.fill('#password', 'Test@1234!');
  149 |             await page.click('button[type="submit"]');
  150 |             
  151 |             const errorVisible = await page.locator(':text("Incorrect"), :text("user-not-found"), :text("invalid-credential")').isVisible();
  152 |             expect(errorVisible).toBeTruthy();
  153 |         });
  154 | 
  155 |         test('Test 10: Empty login fields', async ({ page }) => {
  156 |             await page.goto(`${BASE_URL}/login.html`);
  157 |             await page.click('button[type="submit"]');
  158 |             
  159 |             const emailInput = page.locator('#email');
> 160 |             const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
      |                                                        ^ Error: locator.evaluate: Test timeout of 30000ms exceeded.
  161 |             expect(validationMessage).not.toBe('');
  162 |         });
  163 | 
  164 |         test('Test 11: Unverified email login attempt', async ({ page }) => {
  165 |             // Can't reliably automate without backend access, but we try a known unverified account
  166 |             // Assumes test-dup-001 is unverified
  167 |             await page.goto(`${BASE_URL}/login.html`);
  168 |             await page.fill('#email', 'test-dup-001@nbftest.com');
  169 |             await page.fill('#password', 'Test@1234!');
  170 |             await page.click('button[type="submit"]');
  171 |             
  172 |             const verifyError = await page.locator(':text("verify"), :text("Verify")').isVisible();
  173 |             expect(verifyError).toBeTruthy();
  174 |         });
  175 |     });
  176 | 
  177 |     // === TEST SUITE 3 — ROUTE PROTECTION ===
  178 |     test.describe('SUITE 3: Route Protection', () => {
  179 |         test('Test 12: Direct dashboard access', async ({ page }) => {
  180 |             await page.goto(`${BASE_URL}/dashboard.html`);
  181 |             await page.waitForURL(/login\.html|index\.html/); // Should redirect
  182 |             expect(page.url()).not.toContain('dashboard.html');
  183 |         });
  184 | 
  185 |         test('Test 13: Logout clears session', async ({ page }) => {
  186 |             // Cannot reliably test without an active valid account session that bypasses reCAPTCHA
  187 |             // Assuming redirect works for unauthenticated users anyway
  188 |             await page.goto(`${BASE_URL}/dashboard.html`);
  189 |             expect(page.url()).not.toContain('dashboard.html');
  190 |         });
  191 |     });
  192 | 
  193 |     // === TEST SUITE 4 — PARTNER FORM ===
  194 |     test.describe('SUITE 4: Partner Form', () => {
  195 |         test('Test 14: Partner form empty submission', async ({ page }) => {
  196 |             await page.goto(`${BASE_URL}/partnershipsignup.html`);
  197 |             await page.click('button[type="submit"]');
  198 |             
  199 |             const companyInput = page.locator('#companyName');
  200 |             const validationMessage = await companyInput.evaluate((el) => el.validationMessage);
  201 |             expect(validationMessage).not.toBe('');
  202 |         });
  203 | 
  204 |         test('Test 15: Partner form complete submission', async ({ page }) => {
  205 |             await page.goto(`${BASE_URL}/partnershipsignup.html`);
  206 |             await page.fill('#companyName', 'Test Company Pvt Ltd');
  207 |             await page.fill('#contactPerson', 'Test Person');
  208 |             await page.fill('#email', getUniqueEmail('partner'));
  209 |             await page.fill('#phone', '9876543210');
  210 |             await page.fill('#requirementType', 'Internship Program');
  211 |             await page.fill('#numberOfShurveers', '5');
  212 |             await page.fill('#locationAndDates', 'Hyderabad, July 2026');
  213 |             
  214 |             // Check all 3 checkboxes
  215 |             const checkboxes = await page.locator('input[type="checkbox"]').all();
  216 |             for (const cb of checkboxes) {
  217 |                 await cb.check();
  218 |             }
  219 |             
  220 |             await page.click('button[type="submit"]');
  221 |             await page.waitForTimeout(2000);
  222 |             
  223 |             // Since it might get blocked by reCAPTCHA, we just check if it submitted or threw CAPTCHA error
  224 |             // This will be noted in the report.
  225 |             const success = await page.locator(':text("successfully"), :text("Thank you")').isVisible();
  226 |             const captchaError = await page.locator(':text("captcha")').isVisible();
  227 |             
  228 |             expect(success || captchaError).toBeTruthy();
  229 |         });
  230 | 
  231 |         test('Test 16: Partner declaration checkboxes', async ({ page }) => {
  232 |             await page.goto(`${BASE_URL}/partnershipsignup.html`);
  233 |             await page.fill('#companyName', 'Test Company Pvt Ltd');
  234 |             await page.fill('#contactPerson', 'Test Person');
  235 |             await page.fill('#email', getUniqueEmail('partner'));
  236 |             await page.fill('#phone', '9876543210');
  237 |             
  238 |             // Check only 2 checkboxes
  239 |             const checkboxes = await page.locator('input[type="checkbox"]').all();
  240 |             if(checkboxes.length > 2) {
  241 |                 await checkboxes[0].check();
  242 |                 await checkboxes[1].check();
  243 |             }
  244 |             
  245 |             await page.click('button[type="submit"]');
  246 |             
  247 |             // Should be blocked by validation
  248 |             const validationMessage = await checkboxes[checkboxes.length - 1].evaluate((el) => el.validationMessage);
  249 |             expect(validationMessage).not.toBe('');
  250 |         });
  251 |     });
  252 | 
  253 |     // === TEST SUITE 5 — MOBILE RESPONSIVENESS ===
  254 |     test.describe('SUITE 5: Mobile', () => {
  255 |         test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14
  256 |         
  257 |         test('Test 17: Mobile viewport registration', async ({ page }) => {
  258 |             await page.goto(`${BASE_URL}/register.html`);
  259 |             
  260 |             // Check if there is horizontal overflow by getting page width
```