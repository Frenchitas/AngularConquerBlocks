import { Routes } from '@angular/router';

export const appRoutes = {
    public: {
      root: 'public',
      register: 'register',
      login: 'login',
      notFound: 'not-found',
    },
    private: {
      root: 'private',
      characters: 'characters',
      new_character: 'new-character',
    },
  };

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: `/${appRoutes.public.login}`,
    },
    {
        path: appRoutes.public.login,
        loadComponent: () =>
          import('./public/components/login/login.component').then(
            (m) => m.LoginComponent,
          ),
    },
    {
        path: appRoutes.public.register,
        loadComponent: () =>
          import('./public/components/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
    }
    ];

