import orderRoutes from "./ordersRoutes.js"

const useRoutes = app => {
  app.use(orderRoutes)
}

export default useRoutes