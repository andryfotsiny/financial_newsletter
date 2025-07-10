This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
financial-newsletter/
├── prisma/
│   ├── migrations/
│   │   ├── 20250709070728_add_user_subscription_relation/
│   │   │   └── migration.sql
│   │   ├── 20250709072211_add_user_preferences_relation/
│   │   │   └── migration.sql
│   │   ├── 20250709072952_add_relations_to_user/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── account/
│   │   │   │   ├── preferences/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── subscription/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (public)/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── archives/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── donations/
│   │   │   │   └── page.tsx
│   │   │   ├── premium/
│   │   │   │   └── page.tsx
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── newsletters/
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── analyses/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── email/
│   │   │   │   ├── send/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts
│   │   │   ├── newsletters/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── selections/
│   │   │   │   └── route.ts
│   │   │   ├── subscriptions/
│   │   │   │   └── route.ts
│   │   │   ├── upload/
│   │   │   │   └── route.ts
│   │   │   └── users/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts
│   │   │       ├── preferences/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── simple-toaster.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── tooltip.tsx
│   │   └── index.ts
│   ├── features/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AnalyticsChart.tsx
│   │   │   │   ├── ContentManager.tsx
│   │   │   │   ├── SettingsPanel.tsx
│   │   │   │   └── UserManager.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAdmin.ts
│   │   │   │   ├── useAnalytics.ts
│   │   │   │   ├── useContentManager.ts
│   │   │   │   └── useUserManager.ts
│   │   │   ├── services/
│   │   │   │   ├── adminService.ts
│   │   │   │   └── analyticsService.ts
│   │   │   ├── types/
│   │   │   │   └── admin.types.ts
│   │   │   └── index.ts
│   │   ├── analysis/
│   │   │   ├── components/
│   │   │   │   ├── AnalysisCard.tsx
│   │   │   │   ├── AnalysisCharts.tsx
│   │   │   │   ├── AnalysisEditor.tsx
│   │   │   │   ├── AnalysisMetrics.tsx
│   │   │   │   └── AnalysisViewer.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAnalysis.ts
│   │   │   │   ├── useAnalysisEditor.ts
│   │   │   │   └── useAnalysisMetrics.ts
│   │   │   ├── services/
│   │   │   │   └── analysisService.ts
│   │   │   ├── types/
│   │   │   │   └── analysis.types.ts
│   │   │   ├── validations/
│   │   │   │   └── analysisValidations.ts
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegister.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   ├── validations/
│   │   │   │   └── authValidations.ts
│   │   │   └── index.ts
│   │   ├── content/
│   │   │   ├── components/
│   │   │   │   ├── ContentArchive.tsx
│   │   │   │   ├── ContentEditor.tsx
│   │   │   │   ├── ContentFilters.tsx
│   │   │   │   ├── ContentSearch.tsx
│   │   │   │   └── ContentViewer.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useContent.ts
│   │   │   │   ├── useContentFilters.ts
│   │   │   │   └── useContentSearch.ts
│   │   │   ├── services/
│   │   │   │   └── contentService.ts
│   │   │   ├── types/
│   │   │   │   └── content.types.ts
│   │   │   └── index.ts
│   │   ├── email/
│   │   │   ├── components/
│   │   │   │   ├── EmailPreview.tsx
│   │   │   │   ├── EmailTemplate.tsx
│   │   │   │   └── NewsletterTemplate.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEmail.ts
│   │   │   │   └── useEmailTemplates.ts
│   │   │   ├── services/
│   │   │   │   └── emailService.ts
│   │   │   ├── templates/
│   │   │   │   ├── newsletter-daily.tsx
│   │   │   │   ├── newsletter-weekly.tsx
│   │   │   │   ├── password-reset.tsx
│   │   │   │   └── welcome-email.tsx
│   │   │   ├── types/
│   │   │   │   └── email.types.ts
│   │   │   └── index.ts
│   │   ├── newsletter/
│   │   │   ├── components/
│   │   │   │   ├── NewsletterCard.tsx
│   │   │   │   ├── NewsletterEditor.tsx
│   │   │   │   ├── NewsletterFilters.tsx
│   │   │   │   ├── NewsletterList.tsx
│   │   │   │   └── NewsletterPreview.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useNewsletter.ts
│   │   │   │   ├── useNewsletterEditor.ts
│   │   │   │   └── useNewsletterFilters.ts
│   │   │   ├── services/
│   │   │   │   └── newsletterService.ts
│   │   │   ├── types/
│   │   │   │   └── newsletter.types.ts
│   │   │   ├── validations/
│   │   │   │   └── newsletterValidations.ts
│   │   │   └── index.ts
│   │   ├── selection/
│   │   │   ├── components/
│   │   │   │   ├── SelectionCard.tsx
│   │   │   │   ├── SelectionEditor.tsx
│   │   │   │   └── SelectionList.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSelection.ts
│   │   │   │   └── useSelectionEditor.ts
│   │   │   ├── services/
│   │   │   │   └── selectionService.ts
│   │   │   ├── types/
│   │   │   │   └── selection.types.ts
│   │   │   ├── validations/
│   │   │   │   └── selectionValidations.ts
│   │   │   └── index.ts
│   │   ├── subscription/
│   │   │   ├── components/
│   │   │   │   ├── PaymentForm.tsx
│   │   │   │   ├── PricingTable.tsx
│   │   │   │   ├── SubscriptionCard.tsx
│   │   │   │   └── SubscriptionManager.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── usePayment.ts
│   │   │   │   ├── usePricing.ts
│   │   │   │   └── useSubscription.ts
│   │   │   ├── services/
│   │   │   │   ├── paymentService.ts
│   │   │   │   └── subscriptionService.ts
│   │   │   ├── types/
│   │   │   │   └── subscription.types.ts
│   │   │   ├── validations/
│   │   │   │   └── subscriptionValidations.ts
│   │   │   └── index.ts
│   │   └── user/
│   │       ├── components/
│   │       │   ├── DashboardSidebar.tsx
│   │       │   ├── EditProfileDialog.tsx
│   │       │   ├── FavoritesList.tsx
│   │       │   ├── ReadingHistory.tsx
│   │       │   ├── RecentActivity.tsx
│   │       │   ├── UserDashboard.tsx
│   │       │   ├── UserPreferences.tsx
│   │       │   ├── UserProfile.tsx
│   │       │   └── UserStats.tsx
│   │       ├── hooks/
│   │       │   ├── useFavorites.ts
│   │       │   ├── useReadingHistory.ts
│   │       │   ├── useUser.ts
│   │       │   └── useUserPreferences.ts
│   │       ├── services/
│   │       │   └── userService.ts
│   │       ├── types/
│   │       │   └── user.types.ts
│   │       ├── validations/
│   │       │   └── userValidations.ts
│   │       └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── middleware/
│   │   ├── auth-middleware.ts
│   │   └── rate-limit.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── BackToTop.tsx
│   │   │   │   ├── SEOHead.tsx
│   │   │   │   ├── ShareButtons.tsx
│   │   │   │   └── ThemeToggle.tsx
│   │   │   ├── data-display/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── SortButton.tsx
│   │   │   ├── forms/
│   │   │   │   ├── FormError.tsx
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── FormSuccess.tsx
│   │   │   │   └── FormWrapper.tsx
│   │   │   └── layout/
│   │   │       ├── Container.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Header.tsx
│   │   │       ├── Navigation.tsx
│   │   │       └── Sidebar.tsx
│   │   ├── constants/
│   │   │   ├── api.ts
│   │   │   ├── app.ts
│   │   │   ├── content.ts
│   │   │   └── routes.ts
│   │   ├── hooks/
│   │   │   ├── use-toast.ts
│   │   │   ├── useClickOutside.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useScrollPosition.ts
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth-instance.ts
│   │   │   ├── auth.ts
│   │   │   ├── constants.ts
│   │   │   ├── db.ts
│   │   │   ├── email.ts
│   │   │   ├── prisma.ts
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── providers/
│   │   │   ├── auth-provider.tsx
│   │   │   ├── index.tsx
│   │   │   ├── query-provider.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── types/
│   │   │   ├── api.ts
│   │   │   ├── common.ts
│   │   │   ├── database.ts
│   │   │   └── next-auth.d.ts
│   │   ├── utils/
│   │   │   ├── format-currency.ts
│   │   │   ├── format-date.ts
│   │   │   ├── sanitize.ts
│   │   │   ├── seo.ts
│   │   │   ├── slugify.ts
│   │   │   └── truncate.ts
│   │   └── validations/
│   │       ├── api.ts
│   │       ├── common.ts
│   │       └── database.ts
│   ├── styles/
│   └── middleware.ts
├── .env
├── .gitignore
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
