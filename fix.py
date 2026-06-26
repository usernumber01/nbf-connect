import os

files = [
    'privacy-policy.html', 'terms-and-conditions.html', 'grievance.html',
    'opportunities.html', 'partner.html', 'partner-dashboard.html',
    'partnershipsignup.html', 'resources.html', 'schedule-discussion.html'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    original = content
    content = content.replace('ðŸ ›ï¸  à¤°à¤¾à¤·à¥ à¤Ÿà¥ à¤°à¥€à¤¯ à¤­à¤¾à¤°à¤¤ à¤¬à¤²', '🛡️ राष्ट्रीय भारत बल')
    content = content.replace('à¤°à¤¾à¤·à¥ à¤Ÿà¥ à¤°à¥€à¤¯ à¤­à¤¾à¤°à¤¤ à¤¬à¤²', 'राष्ट्रीय भारत बल')
    content = content.replace('à¤¹à¤¿à¤‚à¤¦à¥€', 'हिंदी')
    
    if content != original:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Fixed {f}")
