# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\comprehensive.spec.js >> NBF Connect Comprehensive Testing >> SUITE 1: Registration >> Test 2: Weak password rejection
- Location: tests\comprehensive.spec.js:23:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="skills"]')
    - locator resolved to 8 elements. Proceeding with the first one: <input name="skills" type="checkbox" value="leadership"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    52 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

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
              - text: Test User
        - generic [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: Mobile Number *
            - generic [ref=e40]:
              - generic: "+91"
              - textbox "Mobile Number *" [active] [ref=e41]:
                - /placeholder: Enter mobile number
                - text: "+919876543210"
            - text: 
          - generic [ref=e42]:
            - generic [ref=e43]: Email Address *
            - generic [ref=e44]:
              - generic: 
              - textbox "Email Address *" [ref=e45]:
                - /placeholder: Enter email address
                - text: test_weak_1782812997505@nbftest.com
            - text: 
        - generic [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]: Password *
            - generic [ref=e49]:
              - generic: 
              - textbox "Password *" [ref=e50]:
                - /placeholder: Create password
              - button "" [ref=e51] [cursor=pointer]:
                - generic [ref=e52]: 
            - generic [ref=e54]:
              - generic [ref=e55]:
                - generic [ref=e56]: ●
                - text: At least 8 characters
              - generic [ref=e57]:
                - generic [ref=e58]: ●
                - text: One uppercase letter (A-Z)
              - generic [ref=e59]:
                - generic [ref=e60]: ●
                - text: One number (0-9)
              - generic [ref=e61]:
                - generic [ref=e62]: ●
                - text: One special character (!@#$%^&*)
          - generic [ref=e63]:
            - generic [ref=e64]: Confirm Password *
            - generic [ref=e65]:
              - generic: 
              - textbox "Confirm Password *" [ref=e66]:
                - /placeholder: Confirm password
              - button "" [ref=e67] [cursor=pointer]:
                - generic [ref=e68]: 
            - text: 
        - generic [ref=e69]:
          - generic [ref=e70]:
            - generic [ref=e71]: Date of Birth *
            - generic [ref=e72]:
              - generic: 
              - textbox "Date of Birth *" [ref=e73]
          - generic [ref=e74]:
            - generic [ref=e75]: Gender *
            - generic [ref=e76]:
              - generic: 
              - combobox "Gender *" [ref=e77]:
                - option "Select gender" [disabled] [selected]
                - option "Male"
                - option "Female"
                - option "Other"
        - generic [ref=e78]:
          - generic [ref=e79]: 
          - text: Location
        - generic [ref=e80]:
          - generic [ref=e81]:
            - generic [ref=e82]: State *
            - generic [ref=e83]:
              - generic: 
              - combobox "State *" [ref=e84]:
                - option "Select state" [disabled]
                - option "Andhra Pradesh" [selected]
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
          - generic [ref=e85]:
            - generic [ref=e86]: District *
            - generic [ref=e87]:
              - generic: 
              - textbox "District *" [ref=e88]:
                - /placeholder: Enter district
        - generic [ref=e89]:
          - generic [ref=e90]: 
          - text: Organization & Skills
        - generic [ref=e91]:
          - generic [ref=e92]: Organization Type *
          - generic [ref=e93]:
            - generic: 
            - combobox "Organization Type *" [ref=e94]:
              - option "Select organization" [disabled]
              - option "NCC" [selected]
              - option "NSS"
              - option "Scouts & Guides"
              - option "Sports Volunteer"
              - option "Civil Defence"
              - option "NYKS"
              - option "Other"
        - generic [ref=e95]:
          - generic [ref=e96]: Skills *
          - generic [ref=e97]:
            - generic [ref=e99] [cursor=pointer]:
              - generic [ref=e100]: 
              - text: Leadership
            - generic [ref=e102] [cursor=pointer]:
              - generic [ref=e103]: 
              - text: Event Management
            - generic [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: 
              - text: Discipline
            - generic [ref=e108] [cursor=pointer]:
              - generic [ref=e109]: 
              - text: Public Speaking
            - generic [ref=e111] [cursor=pointer]:
              - generic [ref=e112]: 
              - text: Fitness
            - generic [ref=e114] [cursor=pointer]:
              - generic [ref=e115]: 
              - text: Teamwork
            - generic [ref=e117] [cursor=pointer]:
              - generic [ref=e118]: 
              - text: Logistics
            - generic [ref=e120] [cursor=pointer]:
              - generic [ref=e121]: 
              - text: Emergency Response
        - generic [ref=e122]:
          - generic [ref=e123]: Availability *
          - generic [ref=e124]:
            - generic: 
            - combobox "Availability *" [ref=e125]:
              - option "Select availability" [disabled] [selected]
              - option "Full-time"
              - option "Part-time"
              - option "Weekends"
              - option "Volunteer"
        - generic [ref=e126]:
          - generic [ref=e127]: 
          - text: Uploads
          - generic [ref=e128]: "*"
        - generic [ref=e129]:
          - generic [ref=e130]:
            - generic [ref=e131]: Upload Resume *
            - generic [ref=e132] [cursor=pointer]:
              - generic [ref=e133]: 
              - generic [ref=e134]:
                - text: Drop PDF here or
                - emphasis [ref=e135]: browse
              - generic [ref=e136]: PDF, DOC up to 300KB
          - generic [ref=e137]:
            - generic [ref=e138]: Upload Profile Photo *
            - generic [ref=e139] [cursor=pointer]:
              - generic [ref=e140]: 
              - generic [ref=e141]:
                - text: Drop image here or
                - emphasis [ref=e142]: browse
              - generic [ref=e143]: JPG, PNG up to 20KB
        - generic [ref=e145]:
          - checkbox "I commit to discipline and integrity as a Shurveer of NBF Connect." [ref=e146] [cursor=pointer]
          - generic [ref=e147] [cursor=pointer]:
            - text: I commit to
            - strong [ref=e148]: discipline and integrity
            - text: as a Shurveer of NBF Connect.
        - iframe [ref=e153]:
          - generic [ref=f1e2]:
            - generic [ref=f1e6]: "ERROR for site owner: Invalid key type"
            - generic [ref=f1e10]: reCAPTCHA
        - button " Join Mission" [ref=e154] [cursor=pointer]:
          - generic [ref=e155]: 
          - generic [ref=e156]: Join Mission
        - paragraph [ref=e157]: For security, login is temporarily locked after 5 failed attempts.
        - generic [ref=e158]:
          - generic [ref=e159]: 🔒
          - generic [ref=e160]: Your data is protected. NBF Connect uses encrypted, secure registration.
        - paragraph [ref=e161]:
          - text: Already registered?
          - link "Login" [ref=e162] [cursor=pointer]:
            - /url: /login
      - generic [ref=e163]:
        - generic [ref=e164]:
          - generic [ref=e165]: 
          - generic [ref=e166]: Verified Network
        - generic [ref=e167]:
          - generic [ref=e168]: 
          - generic [ref=e169]: Skill Building
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - generic [ref=e172]: Opportunities Across India
  - contentinfo [ref=e173]:
    - generic [ref=e174]:
      - generic [ref=e175]:
        - generic [ref=e176]:
          - link "NBF Connect Emblem NBF Connect" [ref=e177] [cursor=pointer]:
            - /url: "#"
            - img "NBF Connect Emblem" [ref=e178]
            - generic [ref=e179]: NBF Connect
          - paragraph [ref=e180]:
            - text: NBF Connect — National Bharat Force Connect
            - text: India's first platform connecting disciplined youth
            - text: with real opportunities.
          - generic [ref=e181]:
            - link "" [ref=e182] [cursor=pointer]:
              - /url: https://www.youtube.com/@NationalBharatForce
              - generic [ref=e183]: 
            - link "" [ref=e184] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e185]: 
            - link "" [ref=e186] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/nbf-connect-7037a6414/
              - generic [ref=e187]: 
            - link "" [ref=e188] [cursor=pointer]:
              - /url: https://x.com/nbfconnect
              - generic [ref=e189]: 
            - link "" [ref=e190] [cursor=pointer]:
              - /url: https://www.instagram.com/nbf.connect/
              - generic [ref=e191]: 
        - generic [ref=e192]:
          - heading "Quick Links" [level=2] [ref=e193]
          - list [ref=e194]:
            - listitem [ref=e195]:
              - link "About NBF CONNECT" [ref=e196] [cursor=pointer]:
                - /url: /#home-hero
            - listitem [ref=e197]:
              - link "Opportunities" [ref=e198] [cursor=pointer]:
                - /url: /opportunities
            - listitem [ref=e199]:
              - link "How It Works" [ref=e200] [cursor=pointer]:
                - /url: /#how-it-works
            - listitem [ref=e201]:
              - link "Shurveers" [ref=e202] [cursor=pointer]:
                - /url: /#who-are-shurveers
            - listitem [ref=e203]:
              - link "Contact Us" [ref=e204] [cursor=pointer]:
                - /url: mailto:contact@nbfconnect.in
        - generic [ref=e205]:
          - heading "Resources" [level=2] [ref=e206]
          - list [ref=e207]:
            - listitem [ref=e208]:
              - link "Career Guide" [ref=e209] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e210]:
              - link "Government Schemes" [ref=e211] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e212]:
              - link "Interview Prep" [ref=e213] [cursor=pointer]:
                - /url: /resources#shurveer-tools
            - listitem [ref=e214]:
              - link "FAQs" [ref=e215] [cursor=pointer]:
                - /url: /resources
            - listitem [ref=e216]:
              - link "Partner Downloads" [ref=e217] [cursor=pointer]:
                - /url: /resources#partner-tools
        - generic [ref=e218]:
          - heading "Govt Policies" [level=2] [ref=e219]
          - list [ref=e220]:
            - listitem [ref=e221]:
              - link "Privacy Policy (Coming Soon)" [ref=e222] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e223]:
              - link "Terms & Conditions (Coming Soon)" [ref=e224] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e225]:
              - link "Grievance Redressal (Coming Soon)" [ref=e226] [cursor=pointer]:
                - /url: "#footer"
            - listitem [ref=e227]:
              - link "RTI Directory" [ref=e228] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e229]:
          - heading "Download App" [level=2] [ref=e230]
          - generic [ref=e231]:
            - link " GET IT ON Google Play" [ref=e232] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e233]: 
              - generic [ref=e234]:
                - generic [ref=e235]: GET IT ON
                - strong [ref=e236]: Google Play
            - link " Download on the App Store" [ref=e237] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e238]: 
              - generic [ref=e239]:
                - generic [ref=e240]: Download on the
                - strong [ref=e241]: App Store
          - generic [ref=e242]: Coming Soon
        - generic [ref=e243]:
          - heading "Newsletter" [level=2] [ref=e244]
          - paragraph [ref=e245]: Stay updated with the latest opportunities and mission updates.
          - generic [ref=e247]:
            - textbox "Email Address" [ref=e248]
            - button "Subscribe" [ref=e249] [cursor=pointer]:
              - generic [ref=e250]: 
      - generic [ref=e251]: NBF = National Bharat Force — India's disciplined youth force comprising NCC, NSS, Scouts & Guides, NYKS and Civil Defence members.
      - generic [ref=e252]:
        - paragraph [ref=e254]: © 2026 NBF Connect (National Bharat Force Connect) | All Rights Reserved. | Made in India
        - generic [ref=e255]:
          - paragraph [ref=e256]:
            - text: "Support:"
            - link "support@nbfconnect.in" [ref=e257] [cursor=pointer]:
              - /url: mailto:support@nbfconnect.in
            - text: "| General:"
            - link "hello@nbfconnect.in" [ref=e258] [cursor=pointer]:
              - /url: mailto:hello@nbfconnect.in
            - text: "| Careers:"
            - link "careers@nbfconnect.in" [ref=e259] [cursor=pointer]:
              - /url: mailto:careers@nbfconnect.in
            - text: "Admin:"
            - link "admin@nbfconnect.in" [ref=e260] [cursor=pointer]:
              - /url: mailto:admin@nbfconnect.in
            - text: "| Contact:"
            - link "contact@nbfconnect.in" [ref=e261] [cursor=pointer]:
              - /url: mailto:contact@nbfconnect.in
          - paragraph [ref=e262]:
            - generic [ref=e263]: 
            - text: Registered MSME | Govt. of India
          - paragraph [ref=e264]: UDYAM-TS-09-0253032
      - generic [ref=e265]: NBF Connect is an independent youth empowerment platform operated by National Bharat Force Connect. Not affiliated with or endorsed by any government ministry, bank, or financial institution.
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
> 30  |             await page.check('input[name="skills"]'); // First skill
      |                        ^ Error: page.check: Test timeout of 30000ms exceeded.
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
```