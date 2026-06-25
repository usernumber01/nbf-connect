import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        opportunities: resolve(__dirname, 'opportunities.html'),
        partner: resolve(__dirname, 'partner.html'),
        partnershipsignup: resolve(__dirname, 'partnershipsignup.html'),
        resources: resolve(__dirname, 'resources.html'),
        schedulediscussion: resolve(__dirname, 'schedule-discussion.html'),
        admin: resolve(__dirname, 'admin.html'),
        partnerdashboard: resolve(__dirname, 'partner-dashboard.html'),
        shurveerdashboard: resolve(__dirname, 'shurveerdashboard.html'),
        termsandconditions: resolve(__dirname, 'terms-and-conditions.html'),
        privacypolicy: resolve(__dirname, 'privacy-policy.html'),
        grievance: resolve(__dirname, 'grievance.html'),
        verifyemail: resolve(__dirname, 'verify-email.html')
      }
    }
  }
})
