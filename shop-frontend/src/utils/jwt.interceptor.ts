import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/auth/signin', '/auth/register']; // Endpoints que não precisam de token
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    console.log("token", clonedReq)
    return next(clonedReq);
  }

  return next(req)
}
