# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\comprehensive.spec.js >> NBF Connect Comprehensive Testing >> SUITE 1: Registration >> Test 5: Invalid mobile number
- Location: tests\comprehensive.spec.js:64:9

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
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
                - text: "+9112345"
            - generic [ref=e42]: Enter valid 10-digit Indian mobile number
            - text: 
          - generic [ref=e43]:
            - generic [ref=e44]: Email Address *
            - generic [ref=e45]:
              - generic: 
              - textbox "Email Address *" [ref=e46]:
                - /placeholder: Enter email address
            - text: 
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]: Password *
            - generic [ref=e50]:
              - generic: 
              - textbox "Password *" [ref=e51]:
                - /placeholder: Create password
              - button "" [ref=e52] [cursor=pointer]:
                - generic [ref=e53]: 
            - generic [ref=e55]:
              - generic [ref=e56]:
                - generic [ref=e57]: ●
                - text: At least 8 characters
              - generic [ref=e58]:
                - generic [ref=e59]: ●
                - text: One uppercase letter (A-Z)
              - generic [ref=e60]:
                - generic [ref=e61]: ●
                - text: One number (0-9)
              - generic [ref=e62]:
                - generic [ref=e63]: ●
                - text: One special character (!@#$%^&*)
          - generic [ref=e64]:
            - generic [ref=e65]: Confirm Password *
            - generic [ref=e66]:
              - generic: 
              - textbox "Confirm Password *" [ref=e67]:
                - /placeholder: Confirm password
              - button "" [ref=e68] [cursor=pointer]:
                - generic [ref=e69]: 
            - text: 
        - generic [ref=e70]:
          - generic [ref=e71]:
            - generic [ref=e72]: Date of Birth *
            - generic [ref=e73]:
              - generic: 
              - textbox "Date of Birth *" [ref=e74]
          - generic [ref=e75]:
            - generic [ref=e76]: Gender *
            - generic [ref=e77]:
              - generic: 
              - combobox "Gender *" [ref=e78]:
                - option "Select gender" [disabled] [selected]
                - option "Male"
                - option "Female"
                - option "Other"
        - generic [ref=e79]:
          - generic [ref=e80]: 
          - text: Location
        - generic [ref=e81]:
          - generic [ref=e82]:
            - generic [ref=e83]: State *
            - generic [ref=e84]:
              - generic: 
              - combobox "State *" [ref=e85]:
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
          - generic [ref=e86]:
            - generic [ref=e87]: District *
            - generic [ref=e88]:
              - generic: 
              - textbox "District *" [ref=e89]:
                - /placeholder: Enter district
        - generic [ref=e90]:
          - generic [ref=e91]: 
          - text: Organization & Skills
        - generic [ref=e92]:
          - generic [ref=e93]: Organization Type *
          - generic [ref=e94]:
            - generic: 
            - combobox "Organization Type *" [ref=e95]:
              - option "Select organization" [disabled] [selected]
              - option "NCC"
              - option "NSS"
              - option "Scouts & Guides"
              - option "Sports Volunteer"
              - option "Civil Defence"
              - option "NYKS"
              - option "Other"
        - generic [ref=e96]:
          - generic [ref=e97]: Skills *
          - generic [ref=e98]:
            - generic [ref=e100] [cursor=pointer]:
              - generic [ref=e101]: 
              - text: Leadership
            - generic [ref=e103] [cursor=pointer]:
              - generic [ref=e104]: 
              - text: Event Management
            - generic [ref=e106] [cursor=pointer]:
              - generic [ref=e107]: 
              - text: Discipline
            - generic [ref=e109] [cursor=pointer]:
              - generic [ref=e110]: 
              - text: Public Speaking
            - generic [ref=e112] [cursor=pointer]:
              - generic [ref=e113]: 
              - text: Fitness
            - generic [ref=e115] [cursor=pointer]:
              - generic [ref=e116]: 
              - text: Teamwork
            - generic [ref=e118] [cursor=pointer]:
              - generic [ref=e119]: 
              - text: Logistics
            - generic [ref=e121] [cursor=pointer]:
              - generic [ref=e122]: 
              - text: Emergency Response
        - generic [ref=e123]:
          - generic [ref=e124]: Availability *
          - generic [ref=e125]:
            - generic: 
            - combobox "Availability *" [ref=e126]:
              - option "Select availability" [disabled] [selected]
              - option "Full-time"
              - option "Part-time"
              - option "Weekends"
              - option "Volunteer"
        - generic [ref=e127]:
          - generic [ref=e128]: 
          - text: Uploads
          - generic [ref=e129]: "*"
        - generic [ref=e130]:
          - generic [ref=e131]:
            - generic [ref=e132]: Upload Resume *
            - generic [ref=e133] [cursor=pointer]:
              - generic [ref=e134]: 
              - generic [ref=e135]:
                - text: Drop PDF here or
                - emphasis [ref=e136]: browse
              - generic [ref=e137]: PDF, DOC up to 300KB
          - generic [ref=e138]:
            - generic [ref=e139]: Upload Profile Photo *
            - generic [ref=e140] [cursor=pointer]:
              - generic [ref=e141]: 
              - generic [ref=e142]:
                - text: Drop image here or
                - emphasis [ref=e143]: browse
              - generic [ref=e144]: JPG, PNG up to 20KB
        - generic [ref=e146]:
          - checkbox "I commit to discipline and integrity as a Shurveer of NBF Connect." [ref=e147] [cursor=pointer]
          - generic [ref=e148] [cursor=pointer]:
            - text: I commit to
            - strong [ref=e149]: discipline and integrity
            - text: as a Shurveer of NBF Connect.
        - button " Join Mission" [active] [ref=e150] [cursor=pointer]:
          - generic [ref=e151]: 
          - generic [ref=e152]: Join Mission
        - paragraph [ref=e153]: For security, login is temporarily locked after 5 failed attempts.
        - generic [ref=e154]:
          - generic [ref=e155]: 🔒
          - generic [ref=e156]: Your data is protected. NBF Connect uses encrypted, secure registration.
        - paragraph [ref=e157]:
          - text: Already registered?
          - link "Login" [ref=e158] [cursor=pointer]:
            - /url: /login
      - generic [ref=e159]:
        - generic [ref=e160]:
          - generic [ref=e161]: 
          - generic [ref=e162]: Verified Network
        - generic [ref=e163]:
          - generic [ref=e164]: 
          - generic [ref=e165]: Skill Building
        - generic [ref=e166]:
          - generic [ref=e167]: 
          - generic [ref=e168]: Opportunities Across India
  - contentinfo [ref=e169]:
    - generic [ref=e170]:
      - generic [ref=e171]:
        - generic [ref=e172]:
          - link "NBF Connect Emblem NBF Connect" [ref=e173] [cursor=pointer]:
            - /url: "#"
            - img "NBF Connect Emblem" [ref=e174]
            - generic [ref=e175]: NBF Connect
          - paragraph [ref=e176]:
            - text: NBF Connect — National Bharat Force Connect
            - text: India's first platform connecting disciplined youth
            - text: with real opportunities.
          - generic [ref=e177]:
            - link "" [ref=e178] [cursor=pointer]:
              - /url: https://www.youtube.com/@NationalBharatForce
              - generic [ref=e179]: 
            - link "" [ref=e180] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e181]: 
            - link "" [ref=e182] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/nbf-connect-7037a6414/
              - generic [ref=e183]: 
            - link "" [ref=e184] [cursor=pointer]:
              - /url: https://x.com/nbfconnect
              - generic [ref=e185]: 
            - link "" [ref=e186] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e187]: 
        - generic [ref=e188]:
          - heading "Quick Links" [level=2] [ref=e189]
          - list [ref=e190]:
            - listitem [ref=e191]:
              - link "About NBF CONNECT" [ref=e192] [cursor=pointer]:
                - /url: /#home-hero
            - listitem [ref=e193]:
              - link "Opportunities" [ref=e194] [cursor=pointer]:
                - /url: /opportunities
            - listitem [ref=e195]:
              - link "How It Works" [ref=e196] [cursor=pointer]:
                - /url: /#how-it-works
            - listitem [ref=e197]:
              - link "Shurveers" [ref=e198] [cursor=pointer]:
                - /url: /#who-are-shurveers
            - listitem [ref=e199]:
              - link "Contact Us" [ref=e200] [cursor=pointer]:
                - /url: mailto:contact@nbfconnect.in
        - generic [ref=e201]:
          - heading "Resources" [level=2] [ref=e202]
          - list [ref=e203]:
            - listitem [ref=e204]:
              - link "Career Guide" [ref=e205] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e206]:
              - link "Government Schemes" [ref=e207] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e208]:
              - link "Interview Prep" [ref=e209] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e210]:
              - link "FAQs" [ref=e211] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e212]:
              - link "Partner Downloads" [ref=e213] [cursor=pointer]:
                - /url: /resources#partner-tools
        - generic [ref=e214]:
          - heading "Govt Policies" [level=2] [ref=e215]
          - list [ref=e216]:
            - listitem [ref=e217]:
              - link "Privacy Policy (Coming Soon)" [ref=e218] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e219]:
              - link "Terms & Conditions (Coming Soon)" [ref=e220] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e221]:
              - link "Grievance Redressal (Coming Soon)" [ref=e222] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e223]:
              - link "RTI Directory" [ref=e224] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e225]:
          - heading "Download App" [level=2] [ref=e226]
          - generic [ref=e227]:
            - link " GET IT ON Google Play" [ref=e228] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e229]: 
              - generic [ref=e230]:
                - generic [ref=e231]: GET IT ON
                - strong [ref=e232]: Google Play
            - link " Download on the App Store" [ref=e233] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e234]: 
              - generic [ref=e235]:
                - generic [ref=e236]: Download on the
                - strong [ref=e237]: App Store
          - generic [ref=e238]: Coming Soon
        - generic [ref=e239]:
          - heading "Newsletter" [level=2] [ref=e240]
          - paragraph [ref=e241]: Stay updated with the latest opportunities and mission updates.
          - generic [ref=e243]:
            - textbox "Email Address" [ref=e244]
            - button "Subscribe" [ref=e245] [cursor=pointer]:
              - generic [ref=e246]: 
      - generic [ref=e247]: NBF = National Bharat Force — India's disciplined youth force comprising NCC, NSS, Scouts & Guides, NYKS and Civil Defence members.
      - generic [ref=e248]:
        - paragraph [ref=e250]: © 2026 NBF Connect (National Bharat Force Connect) | All Rights Reserved. | Made in India
        - generic [ref=e251]:
          - paragraph [ref=e252]:
            - text: "Support:"
            - link "support@nbfconnect.in" [ref=e253] [cursor=pointer]:
              - /url: mailto:support@nbfconnect.in
            - text: "| General:"
            - link "hello@nbfconnect.in" [ref=e254] [cursor=pointer]:
              - /url: mailto:hello@nbfconnect.in
            - text: "| Careers:"
            - link "careers@nbfconnect.in" [ref=e255] [cursor=pointer]:
              - /url: mailto:careers@nbfconnect.in
            - text: "Admin:"
            - link "admin@nbfconnect.in" [ref=e256] [cursor=pointer]:
              - /url: mailto:admin@nbfconnect.in
            - text: "| Contact:"
            - link "contact@nbfconnect.in" [ref=e257] [cursor=pointer]:
              - /url: mailto:contact@nbfconnect.in
          - paragraph [ref=e258]:
            - generic [ref=e259]: 
            - text: Registered MSME | Govt. of India
          - paragraph [ref=e260]: UDYAM-TS-09-0253032
      - generic [ref=e261]: NBF Connect is an independent youth empowerment platform operated by National Bharat Force Connect. Not affiliated with or endorsed by any government ministry, bank, or financial institution.
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const BASE_URL = 'https://nbfconnect.in';
  4   | 
  5   | // Helper for unique emails
  6   | const getUniqueEmail = (prefix) => `${prefix}_${Date.now()}@nbftest.com`;
  7   | 
  8   | test.describe('NBF Connect Comprehensive Testing', () => {
  9   | 
  10  |     // === TEST SUITE 1 — REGISTRATION EDGE CASES ===
  11  |     test.describe('SUITE 1: Registration', () => {
  12  |         
  13  |         test('Test 1: Empty form submission', async ({ page }) => {
  14  |             await page.goto(`${BASE_URL}/register.html`);
  15  |             await page.click('button[type="submit"]');
  16  |             
  17  |             // Expected validation message (usually standard HTML5 required message or custom JS error)
  18  |             // We just check that the form didn't submit (URL didn't change and errors exist)
  19  |             const errorVisible = await page.locator(':text("Please fill out this field"), .error, .empty-field-error').count();
  20  |             expect(errorVisible).toBeGreaterThan(0);
  21  |         });
  22  | 
  23  |         test('Test 2: Weak password rejection', async ({ page }) => {
  24  |             await page.goto(`${BASE_URL}/register.html`);
  25  |             await page.fill('#fullName', 'Test User');
  26  |             await page.fill('#email', getUniqueEmail('test_weak'));
  27  |             await page.fill('#mobile', '9876543210');
  28  |             await page.selectOption('#state', { index: 1 });
  29  |             await page.selectOption('#orgType', { index: 1 });
  30  |             await page.check('input[name="skills"]'); // First skill
  31  |             
  32  |             await page.fill('#password', 'abc123'); // Weak password
  33  |             await page.fill('#confirmPassword', 'abc123');
  34  |             await page.check('#declaration');
  35  |             
  36  |             await page.click('button[type="submit"]');
  37  |             
  38  |             // Should show password strength error
  39  |             const pwdErrorVisible = await page.locator(':text("Password must contain"), :text("stronger password")').isVisible();
  40  |             expect(pwdErrorVisible).toBeTruthy();
  41  |         });
  42  | 
  43  |         test('Test 3: Mismatched passwords', async ({ page }) => {
  44  |             await page.goto(`${BASE_URL}/register.html`);
  45  |             await page.fill('#password', 'Test@1234');
  46  |             await page.fill('#confirmPassword', 'Test@5678');
  47  |             await page.click('button[type="submit"]');
  48  |             
  49  |             const mismatchError = await page.locator(':text("Passwords do not match")').isVisible();
  50  |             expect(mismatchError).toBeTruthy();
  51  |         });
  52  | 
  53  |         test('Test 4: Invalid email format', async ({ page }) => {
  54  |             await page.goto(`${BASE_URL}/register.html`);
  55  |             await page.fill('#email', 'notanemail');
  56  |             await page.click('button[type="submit"]');
  57  |             
  58  |             // HTML5 validation or JS validation should block it
  59  |             const emailInput = page.locator('#email');
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
> 71  |             expect(validationMessage).not.toBe('');
      |                                           ^ Error: expect(received).not.toBe(expected) // Object.is equality
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
  160 |             const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
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
```