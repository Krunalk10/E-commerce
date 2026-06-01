import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { BoutiquesPage } from '../../features/boutiques/pages/BoutiquesPage'
import { BrandsPage } from '../../features/brands/pages/BrandsPage'
import { CartPage } from '../../features/cart/pages/CartPage'
import { CatalogPage } from '../../features/catalog/pages/CatalogPage'
import { CheckoutPage } from '../../features/checkout/pages/CheckoutPage'
import { ComparePage } from '../../features/compare/pages/ComparePage'
import { GuidePage } from '../../features/guide/pages/GuidePage'
import { HomePage } from '../../features/home/pages/HomePage'
import { ProductDetailPage } from '../../features/product-detail/pages/ProductDetailPage'
import { ProfilePage } from '../../features/profile/pages/ProfilePage'
import { WatchFinderPage } from '../../features/watch-finder/pages/WatchFinderPage'
import { WishlistPage } from '../../features/wishlist/pages/WishlistPage'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { SignupPage } from '../../features/auth/pages/SignupPage'
import { NotFoundPage } from './NotFoundPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route element={<HomePage />} index />
          <Route element={<CatalogPage />} path="catalog" />
          <Route element={<ProductDetailPage />} path="watches/:slug" />
          <Route element={<BrandsPage />} path="brands" />
          <Route element={<WatchFinderPage />} path="watch-finder" />
          <Route element={<GuidePage />} path="guide" />
          <Route element={<BoutiquesPage />} path="boutiques" />
          <Route element={<WishlistPage />} path="wishlist" />
          <Route element={<ComparePage />} path="compare" />
          <Route element={<CartPage />} path="cart" />
          <Route element={<CheckoutPage />} path="checkout" />
          <Route element={<ProfilePage />} path="profile" />
          <Route element={<LoginPage />} path="login" />
          <Route element={<SignupPage />} path="signup" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
