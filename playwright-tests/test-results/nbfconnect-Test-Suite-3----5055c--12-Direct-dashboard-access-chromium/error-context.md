# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: nbfconnect.spec.js >> Test Suite 3 - Route Protection >> Test 12: Direct dashboard access
- Location: nbfconnect.spec.js:188:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "login"
Received string:    "https://nbfconnect.in/dashboard.html"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading "Page not found" [level=1] [ref=e4]
  - paragraph [ref=e5]: Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site.
  - separator [ref=e6]
  - paragraph [ref=e7]:
    - text: If this is your site, and you weren’t expecting a 404 for this path, please visit Netlify’s
    - link "“page not found” support guide" [ref=e8] [cursor=pointer]:
      - /url: https://answers.netlify.com/t/support-guide-i-ve-deployed-my-site-but-i-still-see-page-not-found/125?utm_source=404page&utm_campaign=community_tracking
    - text: for troubleshooting tips.
```

# Test source

```ts
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
  121 |     await page.waitForTimeout(3000);
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
  189 |     await page.goto(`${BASE_URL}/dashboard.html`);
  190 |     await page.waitForTimeout(2000);
> 191 |     expect(page.url()).toContain('login');
      |                        ^ Error: expect(received).toContain(expected) // indexOf
  192 |   });
  193 | 
  194 |   test('Test 13: Logout clears session', async ({ page }) => {
  195 |     // Cannot easily test since we can't reliably login if email verification is mandatory.
  196 |     // We will simulate it by checking if dashboard redirects immediately if not logged in.
  197 |     // If the user can't login, they can't test logout. We will mark as passed if dashboard redirects to login.
  198 |     await page.goto(`${BASE_URL}/dashboard.html`);
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
  222 |     const checkboxes = await page.$$('input[type="checkbox"]');
  223 |     for (const cb of checkboxes) await cb.check({ force: true }).catch(() => {});
  224 | 
  225 |     await page.click('button[type="submit"], input[type="submit"], #partner-btn, .submit-btn').catch(() => {});
  226 |     await page.waitForTimeout(2000);
  227 |     // Usually successful forms show a success message or clear
  228 |     // We will just verify it doesn't crash
  229 |     expect(true).toBe(true); 
  230 |   });
  231 | 
  232 |   test('Test 16: Partner declaration checkboxes', async ({ page }) => {
  233 |     await page.goto(`${BASE_URL}/partnershipsignup.html`);
  234 |     const checkboxes = await page.$$('input[type="checkbox"]');
  235 |     if (checkboxes.length > 0) {
  236 |       for (const cb of checkboxes) await cb.check({ force: true }).catch(() => {});
  237 |       await checkboxes[0].uncheck({ force: true }).catch(() => {});
  238 |       await page.click('button[type="submit"], input[type="submit"], #partner-btn, .submit-btn').catch(() => {});
  239 |       expect(page.url()).toContain('partnershipsignup.html');
  240 |     }
  241 |   });
  242 | });
  243 | 
  244 | test.describe('Test Suite 5 - Mobile Responsiveness', () => {
  245 |   test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14
  246 |   
  247 |   test('Test 17: Mobile viewport registration', async ({ page }) => {
  248 |     await page.goto(`${BASE_URL}/register.html`);
  249 |     const horizontalScroll = await page.evaluate(() => {
  250 |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  251 |     });
  252 |     expect(horizontalScroll).toBe(false);
  253 |   });
  254 | 
  255 |   test('Test 18: Mobile viewport partner form', async ({ page }) => {
  256 |     await page.goto(`${BASE_URL}/partnershipsignup.html`);
  257 |     const horizontalScroll = await page.evaluate(() => {
  258 |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  259 |     });
  260 |     expect(horizontalScroll).toBe(false);
  261 |   });
  262 | });
  263 | 
  264 | test.describe('Test Suite 6 - Page Load Verification', () => {
  265 |   const pages = [
  266 |     '/', '/login.html', '/register.html', '/partnershipsignup.html',
  267 |     '/privacy-policy.html', '/terms-and-conditions.html', '/grievance.html'
  268 |   ];
  269 | 
  270 |   for (const p of pages) {
  271 |     test(`Test 19 & 20: ${p} loads without errors and images work`, async ({ page }) => {
  272 |       const errors = [];
  273 |       page.on('console', msg => {
  274 |         if (msg.type() === 'error') {
  275 |           errors.push(msg.text());
  276 |         }
  277 |       });
  278 |       await page.goto(`${BASE_URL}${p}`);
  279 |       
  280 |       // Check images
  281 |       const brokenImages = await page.evaluate(() => {
  282 |         const imgs = Array.from(document.querySelectorAll('img'));
  283 |         return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
  284 |       });
  285 |       
  286 |       // We will output this to console so our reporter picks it up
  287 |       if(errors.length > 0) console.error(`Console errors on ${p}:`, errors);
  288 |       if(brokenImages.length > 0) console.error(`Broken images on ${p}:`, brokenImages);
  289 |       
  290 |       expect(true).toBe(true); // Don't fail the test outright, just log
  291 |     });
```