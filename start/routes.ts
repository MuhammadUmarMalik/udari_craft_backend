import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.group(() => {
  Route.get('/users/exclude-current', 'AuthController.getAllExceptCurrent')
  Route.put('/users/:id', 'AuthController.update')
  Route.delete('/users/:id', 'AuthController.destroy')

  Route.post('/categories', 'CategoriesController.store')
  Route.get('/categories', 'CategoriesController.index')
  Route.put('/categories/:id', 'CategoriesController.update')
  Route.delete('/categories/:id', 'CategoriesController.destroy')

  Route.post('/products', 'ProductsController.store')
  Route.get('/products', 'ProductsController.index')
  Route.put('/products/:id', 'ProductsController.update')
  Route.delete('/products/:id', 'ProductsController.destroy')
  Route.delete('/productImages/:id', 'ProductsController.deleteImage')

  Route.get('/reviews', 'ReviewsController.index')
  Route.put('/reviews/:id', 'ReviewsController.update')
  Route.delete('/reviews/:id', 'ReviewsController.destroy')

  Route.post('/banners', 'BannersController.store')
  Route.get('/banners', 'BannersController.index')
  Route.put('/banners/:id', 'BannersController.update')
  Route.delete('/banners/:id', 'BannersController.destroy')

  Route.put('/complaints/:id', 'ComplaintsController.update')
  Route.post("/complaints/send-mail", "ComplaintsController.sendEmail")
  Route.get('/complaints', 'ComplaintsController.index')

  Route.put('/admin/orders/:id', 'OrdersController.updateOrderStatus')
  Route.put('/admin/orders/:id/:payment-status', 'OrdersController.updatePaymentStatus')
  Route.post("/orders/pagination", "OrdersController.pagination")

  Route.get('/products/getStatistics', 'AdminDashboardsController.getStatistics')
  Route.post('/verify-password', 'AdminDashboardsController.verifyPassword')
  Route.post('/forgot-password', 'AdminDashboardsController.forgotPassword')

  Route.post('/notifications', 'NotificationsController.create')
  Route.patch('/notifications/:id/markAsRead', 'NotificationsController.markAsRead')
  Route.patch('/notifications/markAllAsRead', 'NotificationsController.markAllAsRead')
  Route.get('/notifications/unread', 'NotificationsController.getUnread')
}).prefix('api').middleware(['auth'])

Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

Route.get('/categories', 'CategoriesController.index')
Route.get('/products/:id', 'ProductsController.show')
Route.get("/products", "ProductsController.pagination")

Route.post('/reviews', 'ReviewsController.store')
Route.get('/reviews', 'ReviewsController.index')

Route.post('/complaints', 'ComplaintsController.store')

Route.get('/banners', 'BannersController.show')

Route.post('/orders', 'OrdersController.store')
Route.get('/orders/:order_number', 'OrdersController.getOrderDetails')
Route.post('/create-checkout-session/:id', 'OrdersController.createCheckoutSession')
Route.get('/verify-payment', 'OrdersController.verifyPayment')
Route.post('/create-jazzcash-checkout/:id', 'OrdersController.createJazzCashCheckout')
