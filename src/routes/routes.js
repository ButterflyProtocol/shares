import SharesLayout from '@/pages/Shares/Layout/SharesLayout.vue';

// GeneralViews
import NotFound from '@/pages/GeneralViews/NotFoundPage.vue';

// Page Headers
import DefaultHeader from '@/pages/Shares/DefaultHeader';

// Shares pages
import Manage from '@/pages/Shares/Manage/Index.vue';

const routes = [
  {
    path: '/',
    component: SharesLayout,
    redirect: '/manage',
    name: 'Shares',
    children: [
      {
        path: 'manage',
        name: 'Manage',
        components: { default: Manage, header: DefaultHeader }
      }
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;
