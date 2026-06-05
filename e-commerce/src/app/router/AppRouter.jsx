import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { BoutiquesPage } from '../../pages/boutiques/BoutiquesPage'
import { BrandsPage } from '../../pages/brands/BrandsPage'
import { CartPage } from '../../pages/cart/CartPage'
import { CatalogPage } from '../../pages/catalog/CatalogPage'
import { CheckoutPage } from '../../pages/checkout/CheckoutPage'
import { ComparePage } from '../../pages/compare/ComparePage'
import { GuidePage } from '../../pages/guide/GuidePage'
import { HomePage } from '../../pages/home/HomePage'
import { ProductDetailPage } from '../../pages/product-detail/ProductDetailPage'
import { ProfilePage } from '../../pages/profile/ProfilePage'
import { WatchFinderPage } from '../../pages/watch-finder/WatchFinderPage'
import { WishlistPage } from '../../pages/wishlist/WishlistPage'
import { LoginPage } from '../../pages/auth/LoginPage'
import { SignupPage } from '../../pages/auth/SignupPage'
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
