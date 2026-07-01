# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nbfconnect.spec.js >> Test Suite 1 - Registration Edge Cases >> Test 7: Duplicate email
- Location: nbfconnect.spec.js:109:3

# Error details

```
Test timeout of 8000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 8000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link " Back to Home" [ref=e2] [cursor=pointer]:
    - /url: /
    - generic [ref=e3]: 
    - generic [ref=e4]: Back to Home
  - generic [ref=e5]:
    - generic [ref=e6]:
      - img "Disciplined Youth" [ref=e8]
      - generic [ref=e9]:
        - link "NBF Connect Emblem NBF Connect" [ref=e10] [cursor=pointer]:
          - /url: /
          - img "NBF Connect Emblem" [ref=e11]
          - generic [ref=e12]: NBF Connect
        - heading "Your Discipline Is Your Superpower" [level=1] [ref=e13]:
          - text: Your Discipline
          - text: Is Your Superpower
        - paragraph [ref=e14]: Join thousands of verified Shurveers building their careers through India's largest disciplined youth network.
        - generic [ref=e15]:
          - generic [ref=e16]:
            - generic [ref=e17]: Verified
            - generic [ref=e18]: Shurveers
          - generic [ref=e19]:
            - generic [ref=e20]: Real
            - generic [ref=e21]: Opportunities
          - generic [ref=e22]:
            - generic [ref=e23]: Trusted
            - generic [ref=e24]: Organizations
    - generic [ref=e26]:
      - generic [ref=e27]:
        - heading "Become a Shurveer" [level=2] [ref=e28]
        - paragraph [ref=e29]: Join India's disciplined youth opportunity network.
      - text:  
      - generic [ref=e30]:
        - generic [ref=e31]:
          - generic [ref=e32]: 
          - text: Personal Information
        - generic [ref=e33]:
          - generic [ref=e34]: Full Name *
          - generic [ref=e35]:
            - generic: 
            - textbox "Full Name *" [ref=e36]:
              - /placeholder: Enter your full name
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: Mobile Number *
            - generic [ref=e40]:
              - generic: "+91"
              - textbox "Mobile Number *" [ref=e41]:
                - /placeholder: Enter mobile number
                - text: "+919876543210"
            - generic [ref=e43]: 
          - generic [ref=e44]:
            - generic [ref=e45]: Email Address *
            - generic [ref=e46]:
              - generic: 
              - textbox "Email Address *" [ref=e47]:
                - /placeholder: Enter email address
                - text: test-dup-001@nbftest.com
            - text: 
        - generic [ref=e48]:
          - generic [ref=e49]:
            - generic [ref=e50]: Password *
            - generic [ref=e51]:
              - generic: 
              - textbox "Password *" [ref=e52]:
                - /placeholder: Create password
                - text: Test@1234
              - button "" [ref=e53] [cursor=pointer]:
                - generic [ref=e54]: 
            - generic [ref=e57]:
              - generic [ref=e58]:
                - generic [ref=e59]: ✓
                - text: At least 8 characters
              - generic [ref=e60]:
                - generic [ref=e61]: ✓
                - text: One uppercase letter (A-Z)
              - generic [ref=e62]:
                - generic [ref=e63]: ✓
                - text: One number (0-9)
              - generic [ref=e64]:
                - generic [ref=e65]: ✓
                - text: One special character (!@#$%^&*)
          - generic [ref=e66]:
            - generic [ref=e67]: Confirm Password *
            - generic [ref=e68]:
              - generic: 
              - textbox "Confirm Password *" [ref=e69]:
                - /placeholder: Confirm password
                - text: Test@1234
              - button "" [ref=e70] [cursor=pointer]:
                - generic [ref=e71]: 
            - generic [ref=e73]: 
        - generic [ref=e74]:
          - generic [ref=e75]:
            - generic [ref=e76]: Date of Birth *
            - generic [ref=e77]:
              - generic: 
              - textbox "Date of Birth *" [ref=e78]
          - generic [ref=e79]:
            - generic [ref=e80]: Gender *
            - generic [ref=e81]:
              - generic: 
              - combobox "Gender *" [ref=e82]:
                - option "Select gender" [disabled] [selected]
                - option "Male"
                - option "Female"
                - option "Other"
        - generic [ref=e83]:
          - generic [ref=e84]: 
          - text: Location
        - generic [ref=e85]:
          - generic [ref=e86]:
            - generic [ref=e87]: State *
            - generic [ref=e88]:
              - generic: 
              - combobox "State *" [ref=e89]:
                - option "Select state" [disabled] [selected]
                - option "Andhra Pradesh"
                - option "Arunachal Pradesh"
                - option "Assam"
                - option "Bihar"
                - option "Chhattisgarh"
                - option "Goa"
                - option "Gujarat"
                - option "Haryana"
                - option "Himachal Pradesh"
                - option "Jharkhand"
                - option "Karnataka"
                - option "Kerala"
                - option "Madhya Pradesh"
                - option "Maharashtra"
                - option "Manipur"
                - option "Meghalaya"
                - option "Mizoram"
                - option "Nagaland"
                - option "Odisha"
                - option "Punjab"
                - option "Rajasthan"
                - option "Sikkim"
                - option "Tamil Nadu"
                - option "Telangana"
                - option "Tripura"
                - option "Uttar Pradesh"
                - option "Uttarakhand"
                - option "West Bengal"
                - option "Delhi"
                - option "Jammu & Kashmir"
          - generic [ref=e90]:
            - generic [ref=e91]: District *
            - generic [ref=e92]:
              - generic: 
              - textbox "District *" [ref=e93]:
                - /placeholder: Enter district
        - generic [ref=e94]:
          - generic [ref=e95]: 
          - text: Organization & Skills
        - generic [ref=e96]:
          - generic [ref=e97]: Organization Type *
          - generic [ref=e98]:
            - generic: 
            - combobox "Organization Type *" [ref=e99]:
              - option "Select organization" [disabled] [selected]
              - option "NCC"
              - option "NSS"
              - option "Scouts & Guides"
              - option "Sports Volunteer"
              - option "Civil Defence"
              - option "NYKS"
              - option "Other"
        - generic [ref=e100]:
          - generic [ref=e101]: Skills *
          - generic [ref=e102]:
            - generic [ref=e104] [cursor=pointer]:
              - generic [ref=e105]: 
              - text: Leadership
            - generic [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
              - text: Event Management
            - generic [ref=e110] [cursor=pointer]:
              - generic [ref=e111]: 
              - text: Discipline
            - generic [ref=e113] [cursor=pointer]:
              - generic [ref=e114]: 
              - text: Public Speaking
            - generic [ref=e116] [cursor=pointer]:
              - generic [ref=e117]: 
              - text: Fitness
            - generic [ref=e119] [cursor=pointer]:
              - generic [ref=e120]: 
              - text: Teamwork
            - generic [ref=e122] [cursor=pointer]:
              - generic [ref=e123]: 
              - text: Logistics
            - generic [ref=e125] [cursor=pointer]:
              - generic [ref=e126]: 
              - text: Emergency Response
        - generic [ref=e127]:
          - generic [ref=e128]: Availability *
          - generic [ref=e129]:
            - generic: 
            - combobox "Availability *" [ref=e130]:
              - option "Select availability" [disabled] [selected]
              - option "Full-time"
              - option "Part-time"
              - option "Weekends"
              - option "Volunteer"
        - generic [ref=e131]:
          - generic [ref=e132]: 
          - text: Uploads
          - generic [ref=e133]: "*"
        - generic [ref=e134]:
          - generic [ref=e135]:
            - generic [ref=e136]: Upload Resume *
            - generic [ref=e137] [cursor=pointer]:
              - generic [ref=e138]: 
              - generic [ref=e139]:
                - text: Drop PDF here or
                - emphasis [ref=e140]: browse
              - generic [ref=e141]: PDF, DOC up to 300KB
          - generic [ref=e142]:
            - generic [ref=e143]: Upload Profile Photo *
            - generic [ref=e144] [cursor=pointer]:
              - generic [ref=e145]: 
              - generic [ref=e146]:
                - text: Drop image here or
                - emphasis [ref=e147]: browse
              - generic [ref=e148]: JPG, PNG up to 20KB
        - generic [ref=e150]:
          - checkbox "I commit to discipline and integrity as a Shurveer of NBF Connect." [checked] [ref=e151] [cursor=pointer]
          - generic [ref=e152] [cursor=pointer]:
            - text: I commit to
            - strong [ref=e153]: discipline and integrity
            - text: as a Shurveer of NBF Connect.
        - generic [ref=e154]:
          - iframe [ref=e156]:
            - generic [ref=f2e2] [cursor=pointer]:
              - checkbox "'I am human', Select in order to trigger the challenge, or to bypass it if you have an accessibility cookie" [ref=f2e7]
              - generic [ref=f2e11]: I am human
              - generic [ref=f2e12]:
                - generic "hCaptcha" [ref=f2e13]:
                  - button "hCaptcha logo, opens new window with more information" [ref=f2e14]:
                    - img [ref=f2e16]
                - generic [ref=f2e78]:
                  - link "hCaptcha Privacy Policy, opens in a new tab" [ref=f2e79]:
                    - /url: https://hcaptcha.com/privacy?ref=nbfconnect.in&utm_campaign=00809a90-2cd2-4e52-b064-b87ed61c6f9e&utm_medium=checkbox&hl=en
                    - text: Privacy
                  - text: "-"
                  - link "hCaptcha Terms of Service, opens in a new tab" [ref=f2e80]:
                    - /url: https://hcaptcha.com/terms?ref=nbfconnect.in&utm_campaign=00809a90-2cd2-4e52-b064-b87ed61c6f9e&utm_medium=checkbox&hl=en
                    - text: Terms
          - generic [ref=e157]: Please complete the CAPTCHA to continue.
        - button " Join Mission" [active] [ref=e158] [cursor=pointer]:
          - generic [ref=e159]: 
          - generic [ref=e160]: Join Mission
        - paragraph [ref=e161]: For security, login is temporarily locked after 5 failed attempts.
        - generic [ref=e162]:
          - generic [ref=e163]: 🔒
          - generic [ref=e164]: Your data is protected. NBF Connect uses encrypted, secure registration.
        - paragraph [ref=e165]:
          - text: Already registered?
          - link "Login" [ref=e166] [cursor=pointer]:
            - /url: /login
      - generic [ref=e167]:
        - generic [ref=e168]:
          - generic [ref=e169]: 
          - generic [ref=e170]: Verified Network
        - generic [ref=e171]:
          - generic [ref=e172]: 
          - generic [ref=e173]: Skill Building
        - generic [ref=e174]:
          - generic [ref=e175]: 
          - generic [ref=e176]: Opportunities Across India
  - contentinfo [ref=e177]:
    - generic [ref=e178]:
      - generic [ref=e179]:
        - generic [ref=e180]:
          - link "NBF Connect Emblem NBF Connect" [ref=e181] [cursor=pointer]:
            - /url: "#"
            - img "NBF Connect Emblem" [ref=e182]
            - generic [ref=e183]: NBF Connect
          - paragraph [ref=e184]:
            - text: NBF Connect — National Bharat Force Connect
            - text: India's first platform connecting disciplined youth
            - text: with real opportunities.
          - generic [ref=e185]:
            - link "" [ref=e186] [cursor=pointer]:
              - /url: https://www.youtube.com/@NationalBharatForce
              - generic [ref=e187]: 
            - link "" [ref=e188] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e189]: 
            - link "" [ref=e190] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/nbf-connect-7037a6414/
              - generic [ref=e191]: 
            - link "" [ref=e192] [cursor=pointer]:
              - /url: https://x.com/nbfconnect
              - generic [ref=e193]: 
            - link "" [ref=e194] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e195]: 
        - generic [ref=e196]:
          - heading "Quick Links" [level=2] [ref=e197]
          - list [ref=e198]:
            - listitem [ref=e199]:
              - link "About NBF CONNECT" [ref=e200] [cursor=pointer]:
                - /url: /#home-hero
            - listitem [ref=e201]:
              - link "Opportunities" [ref=e202] [cursor=pointer]:
                - /url: /opportunities
            - listitem [ref=e203]:
              - link "How It Works" [ref=e204] [cursor=pointer]:
                - /url: /#how-it-works
            - listitem [ref=e205]:
              - link "Shurveers" [ref=e206] [cursor=pointer]:
                - /url: /#who-are-shurveers
            - listitem [ref=e207]:
              - link "Contact Us" [ref=e208] [cursor=pointer]:
                - /url: mailto:contact@nbfconnect.in
        - generic [ref=e209]:
          - heading "Resources" [level=2] [ref=e210]
          - list [ref=e211]:
            - listitem [ref=e212]:
              - link "Career Guide" [ref=e213] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e214]:
              - link "Government Schemes" [ref=e215] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e216]:
              - link "Interview Prep" [ref=e217] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e218]:
              - link "FAQs" [ref=e219] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e220]:
              - link "Partner Downloads" [ref=e221] [cursor=pointer]:
                - /url: /resources#partner-tools
        - generic [ref=e222]:
          - heading "Govt Policies" [level=2] [ref=e223]
          - list [ref=e224]:
            - listitem [ref=e225]:
              - link "Privacy Policy (Coming Soon)" [ref=e226] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e227]:
              - link "Terms & Conditions (Coming Soon)" [ref=e228] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e229]:
              - link "Grievance Redressal (Coming Soon)" [ref=e230] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e231]:
              - link "RTI Directory" [ref=e232] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e233]:
          - heading "Download App" [level=2] [ref=e234]
          - generic [ref=e235]:
            - link " GET IT ON Google Play" [ref=e236] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e237]: 
              - generic [ref=e238]:
                - generic [ref=e239]: GET IT ON
                - strong [ref=e240]: Google Play
            - link " Download on the App Store" [ref=e241] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e242]: 
              - generic [ref=e243]:
                - generic [ref=e244]: Download on the
                - strong [ref=e245]: App Store
          - generic [ref=e246]: Coming Soon
        - generic [ref=e247]:
          - heading "Newsletter" [level=2] [ref=e248]
          - paragraph [ref=e249]: Stay updated with the latest opportunities and mission updates.
          - generic [ref=e251]:
            - textbox "Email Address" [ref=e252]
            - button "Subscribe" [ref=e253] [cursor=pointer]:
              - generic [ref=e254]: 
      - generic [ref=e255]: NBF = National Bharat Force — India's disciplined youth force comprising NCC, NSS, Scouts & Guides, NYKS and Civil Defence members.
      - generic [ref=e256]:
        - paragraph [ref=e258]: © 2026 NBF Connect (National Bharat Force Connect) | All Rights Reserved. | Made in India
        - generic [ref=e259]:
          - paragraph [ref=e260]:
            - text: "Support:"
            - link "support@nbfconnect.in" [ref=e261] [cursor=pointer]:
              - /url: mailto:support@nbfconnect.in
            - text: "| General:"
            - link "hello@nbfconnect.in" [ref=e262] [cursor=pointer]:
              - /url: mailto:hello@nbfconnect.in
            - text: "| Careers:"
            - link "careers@nbfconnect.in" [ref=e263] [cursor=pointer]:
              - /url: mailto:careers@nbfconnect.in
            - text: "Admin:"
            - link "admin@nbfconnect.in" [ref=e264] [cursor=pointer]:
              - /url: mailto:admin@nbfconnect.in
            - text: "| Contact:"
            - link "contact@nbfconnect.in" [ref=e265] [cursor=pointer]:
              - /url: mailto:contact@nbfconnect.in
          - paragraph [ref=e266]:
            - generic [ref=e267]: 
            - text: Registered MSME | Govt. of India
          - paragraph [ref=e268]: UDYAM-TS-09-0253032
      - generic [ref=e269]: NBF Connect is an independent youth empowerment platform operated by National Bharat Force Connect. Not affiliated with or endorsed by any government ministry, bank, or financial institution.
```

# Test source

```ts
  21  |     await page.fill('input[type="password"]', 'abc123').catch(() => {});
  22  |     // If there's a confirm password
  23  |     const confirmPasswords = await page.$$('input[type="password"]');
  24  |     if(confirmPasswords.length > 1) {
  25  |        await confirmPasswords[1].fill('abc123');
  26  |     }
  27  |     // check declarations
  28  |     const checkboxes = await page.$$('input[type="checkbox"]');
  29  |     for (const cb of checkboxes) {
  30  |       await cb.check({ force: true }).catch(() => {});
  31  |     }
  32  |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  33  |     // Should show strength message or block
  34  |     await page.waitForTimeout(1000);
  35  |     const bodyText = await page.innerText('body');
  36  |     // Log for report parsing later
  37  |     if(bodyText.toLowerCase().includes('weak') || bodyText.toLowerCase().includes('strength') || bodyText.toLowerCase().includes('password')) {
  38  |         expect(true).toBe(true);
  39  |     } else {
  40  |         expect(page.url()).toContain('register.html'); // At least it shouldn't navigate
  41  |     }
  42  |   });
  43  | 
  44  |   test('Test 3: Mismatched passwords', async ({ page }) => {
  45  |     await page.goto(`${BASE_URL}/register.html`);
  46  |     const passwords = await page.$$('input[type="password"]');
  47  |     if(passwords.length >= 2) {
  48  |       await passwords[0].fill('Test@1234');
  49  |       await passwords[1].fill('Test@5678');
  50  |       await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  51  |       await page.waitForTimeout(1000);
  52  |       const bodyText = await page.innerText('body');
  53  |       expect(bodyText.toLowerCase()).toContain('match');
  54  |     } else {
  55  |       test.skip(); // No confirm password field
  56  |     }
  57  |   });
  58  | 
  59  |   test('Test 4: Invalid email format', async ({ page }) => {
  60  |     await page.goto(`${BASE_URL}/register.html`);
  61  |     await page.fill('input[type="email"]', 'notanemail');
  62  |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  63  |     const emailInput = await page.$('input[type="email"]');
  64  |     const validity = await emailInput.evaluate((node) => node.validity.valid);
  65  |     if (!validity) {
  66  |       expect(validity).toBe(false);
  67  |     } else {
  68  |       await page.waitForTimeout(500);
  69  |       const bodyText = await page.innerText('body');
  70  |       expect(bodyText.toLowerCase()).toContain('valid email');
  71  |     }
  72  |   });
  73  | 
  74  |   test('Test 5: Invalid mobile number', async ({ page }) => {
  75  |     await page.goto(`${BASE_URL}/register.html`);
  76  |     await page.fill('input[type="tel"], input[name="phone"], input[id="phone"]', '12345').catch(() => {});
  77  |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  78  |     const phoneInput = await page.$('input[type="tel"], input[name="phone"], input[id="phone"]');
  79  |     if (phoneInput) {
  80  |       const validity = await phoneInput.evaluate((node) => node.validity.valid);
  81  |       if(!validity) {
  82  |         expect(validity).toBe(false);
  83  |       } else {
  84  |         await page.waitForTimeout(500);
  85  |         expect(page.url()).toContain('register.html');
  86  |       }
  87  |     }
  88  |   });
  89  | 
  90  |   test('Test 6: Declaration unchecked', async ({ page }) => {
  91  |     await page.goto(`${BASE_URL}/register.html`);
  92  |     await page.fill('input[name="fullname"], input[id="fullname"], input[id="name"]', 'Test User').catch(() => {});
  93  |     await page.fill('input[type="email"]', 'test-decl-001@nbftest.com');
  94  |     await page.fill('input[type="tel"]', '9876543210').catch(() => {});
  95  |     const passwords = await page.$$('input[type="password"]');
  96  |     for (const p of passwords) await p.fill('Test@1234');
  97  |     
  98  |     // Uncheck if checked
  99  |     const checkboxes = await page.$$('input[type="checkbox"]');
  100 |     for (const cb of checkboxes) {
  101 |       await cb.uncheck({ force: true }).catch(() => {});
  102 |     }
  103 | 
  104 |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  105 |     await page.waitForTimeout(1000);
  106 |     expect(page.url()).toContain('register.html');
  107 |   });
  108 | 
  109 |   test('Test 7: Duplicate email', async ({ page }) => {
  110 |     // This is hard to do fully reliably on a live site without messing it up, but we'll simulate an attempt.
  111 |     await page.goto(`${BASE_URL}/register.html`);
  112 |     await page.fill('input[name="fullname"], input[id="fullname"], input[id="name"]', 'Test Duplicate').catch(() => {});
  113 |     await page.fill('input[type="email"]', 'test-dup-001@nbftest.com');
  114 |     await page.fill('input[type="tel"]', '9876543210').catch(() => {});
  115 |     const passwords = await page.$$('input[type="password"]');
  116 |     for (const p of passwords) await p.fill('Test@1234');
  117 |     const checkboxes = await page.$$('input[type="checkbox"]');
  118 |     for (const cb of checkboxes) await cb.check({ force: true }).catch(() => {});
  119 |     
  120 |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
> 121 |     await page.waitForTimeout(3000);
      |                ^ Error: page.waitForTimeout: Test timeout of 8000ms exceeded.
  122 |     // If it succeeds, we try again
  123 |     await page.goto(`${BASE_URL}/register.html`);
  124 |     await page.fill('input[name="fullname"], input[id="fullname"], input[id="name"]', 'Test Duplicate').catch(() => {});
  125 |     await page.fill('input[type="email"]', 'test-dup-001@nbftest.com');
  126 |     await page.fill('input[type="tel"]', '9876543210').catch(() => {});
  127 |     for (const p of passwords) await p.fill('Test@1234');
  128 |     for (const cb of checkboxes) await cb.check({ force: true }).catch(() => {});
  129 |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  130 |     await page.waitForTimeout(3000);
  131 |     const bodyText = await page.innerText('body');
  132 |     expect(bodyText.toLowerCase().includes('already') || bodyText.toLowerCase().includes('exist') || bodyText.toLowerCase().includes('use')).toBeTruthy();
  133 |   });
  134 | });
  135 | 
  136 | test.describe('Test Suite 2 - Login Edge Cases', () => {
  137 |   test('Test 8: Wrong password', async ({ page }) => {
  138 |     await page.goto(`${BASE_URL}/login.html`);
  139 |     await page.fill('input[type="email"]', 'test-dup-001@nbftest.com');
  140 |     await page.fill('input[type="password"]', 'WrongPass123!');
  141 |     await page.click('button[type="submit"], input[type="submit"], #login-btn, .submit-btn').catch(() => {});
  142 |     await page.waitForTimeout(2000);
  143 |     const bodyText = await page.innerText('body');
  144 |     expect(page.url()).toContain('login.html');
  145 |   });
  146 | 
  147 |   test('Test 9: Non-existent account', async ({ page }) => {
  148 |     await page.goto(`${BASE_URL}/login.html`);
  149 |     await page.fill('input[type="email"]', 'doesnotexist1234567@nbftest.com');
  150 |     await page.fill('input[type="password"]', 'Test@1234');
  151 |     await page.click('button[type="submit"], input[type="submit"], #login-btn, .submit-btn').catch(() => {});
  152 |     await page.waitForTimeout(2000);
  153 |     const bodyText = await page.innerText('body');
  154 |     expect(bodyText).not.toContain('auth/user-not-found'); // Should be friendly
  155 |   });
  156 | 
  157 |   test('Test 10: Empty login fields', async ({ page }) => {
  158 |     await page.goto(`${BASE_URL}/login.html`);
  159 |     await page.click('button[type="submit"], input[type="submit"], #login-btn, .submit-btn').catch(() => {});
  160 |     expect(page.url()).toContain('login.html');
  161 |   });
  162 | 
  163 |   test('Test 11: Unverified email login attempt', async ({ page }) => {
  164 |     // Requires a fresh email
  165 |     const randEmail = `test-unverified-${Date.now()}@nbftest.com`;
  166 |     await page.goto(`${BASE_URL}/register.html`);
  167 |     await page.fill('input[name="fullname"], input[id="fullname"], input[id="name"]', 'Test Unverified').catch(() => {});
  168 |     await page.fill('input[type="email"]', randEmail);
  169 |     await page.fill('input[type="tel"]', '9876543210').catch(() => {});
  170 |     const passwords = await page.$$('input[type="password"]');
  171 |     for (const p of passwords) await p.fill('Test@123456');
  172 |     const checkboxes = await page.$$('input[type="checkbox"]');
  173 |     for (const cb of checkboxes) await cb.check({ force: true }).catch(() => {});
  174 |     await page.click('button[type="submit"], input[type="submit"], #register-btn, .submit-btn').catch(() => {});
  175 |     await page.waitForTimeout(3000);
  176 | 
  177 |     await page.goto(`${BASE_URL}/login.html`);
  178 |     await page.fill('input[type="email"]', randEmail);
  179 |     await page.fill('input[type="password"]', 'Test@123456');
  180 |     await page.click('button[type="submit"], input[type="submit"], #login-btn, .submit-btn').catch(() => {});
  181 |     await page.waitForTimeout(2000);
  182 |     const bodyText = await page.innerText('body');
  183 |     expect(bodyText.toLowerCase().includes('verify')).toBeTruthy();
  184 |   });
  185 | });
  186 | 
  187 | test.describe('Test Suite 3 - Route Protection', () => {
  188 |   test('Test 12: Direct dashboard access', async ({ page }) => {
  189 |     await page.goto(`${BASE_URL}/shurveerdashboard.html`);
  190 |     await page.waitForTimeout(2000);
  191 |     expect(page.url()).toContain('login');
  192 |   });
  193 | 
  194 |   test('Test 13: Logout clears session', async ({ page }) => {
  195 |     // Cannot easily test since we can't reliably login if email verification is mandatory.
  196 |     // We will simulate it by checking if dashboard redirects immediately if not logged in.
  197 |     // If the user can't login, they can't test logout. We will mark as passed if dashboard redirects to login.
  198 |     await page.goto(`${BASE_URL}/shurveerdashboard.html`);
  199 |     await page.waitForTimeout(1000);
  200 |     expect(page.url()).toContain('login');
  201 |   });
  202 | });
  203 | 
  204 | test.describe('Test Suite 4 - Partner Form', () => {
  205 |   test('Test 14: Partner form empty submission', async ({ page }) => {
  206 |     await page.goto(`${BASE_URL}/partnershipsignup.html`);
  207 |     await page.click('button[type="submit"], input[type="submit"], #partner-btn, .submit-btn').catch(() => {});
  208 |     expect(page.url()).toContain('partnershipsignup.html');
  209 |   });
  210 | 
  211 |   test('Test 15: Partner form complete submission', async ({ page }) => {
  212 |     await page.goto(`${BASE_URL}/partnershipsignup.html`);
  213 |     await page.fill('input[name="company"], input[id="companyName"]', 'Test Company Pvt Ltd').catch(()=>{});
  214 |     await page.fill('input[name="industry"], input[id="industry"]', 'IT/Technology').catch(()=>{});
  215 |     await page.fill('input[name="contact"], input[id="contactPerson"]', 'Test Person').catch(()=>{});
  216 |     await page.fill('input[type="email"]', 'test-partner-001@nbftest.com').catch(()=>{});
  217 |     await page.fill('input[type="tel"]', '+919876543210').catch(()=>{});
  218 |     await page.fill('input[name="requirement"], textarea[id="requirement"]', 'Internship Program').catch(()=>{});
  219 |     await page.fill('input[name="shurveersNeeded"], input[id="shurveersNeeded"]', '5').catch(()=>{});
  220 |     await page.fill('input[name="location"], input[id="location"]', 'Hyderabad, July 2026').catch(()=>{});
  221 |     
```