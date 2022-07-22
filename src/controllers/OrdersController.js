class OrdersController {
  static orderImport(req, res) {
    try {
      const payload = req.body

      const orderCouponsMap = []
      const claimedCouponMultiPromotions = []
      const unclaimedCouponMultiPromotions = []
      const unclaimedCouponsMap = []

      const commerceItems = [] //shopperInput and locationInventoryInfoMap    
      const orderTotalBySite = []


      Object.keys(payload["discountInfo"]["orderCouponsMap"]).forEach(key => {
        const coupon = { coupon: key, ...payload["discountInfo"]["orderCouponsMap"][key] }
        orderCouponsMap.push(coupon)

        if (key in payload["discountInfo"]["claimedCouponMultiPromotions"]) {
          const info = { ...coupon }
          delete info["coupon"]
          claimedCouponMultiPromotions.push({ coupon: key, infoList: [{ ...info }] })
        }
        if(key in payload["discountInfo"]["unclaimedCouponMultiPromotions"]) {
          unclaimedCouponMultiPromotions.push(coupon)
        }
        if(key in payload["discountInfo"]["unclaimedCouponsMap"]) {
          unclaimedCouponsMap.push(coupon)
        }
      })
      payload["order"]["commerceItems"].map(order => {
        commerceItems.push({
          ...order,
          shopperInput: [order["shopperInput"]],
          orderTotalBySite: [order["orderTotalBySite"]]
        })
      })
      orderTotalBySite.push(payload["order"]["priceInfo"]["orderTotalBySite"])

      const formattedPayload = { ...payload }
      formattedPayload["discountInfo"]["orderCouponsMap"] = orderCouponsMap
      formattedPayload["discountInfo"]["claimedCouponMultiPromotions"] = claimedCouponMultiPromotions
      formattedPayload["discountInfo"]["unclaimedCouponMultiPromotions"] = unclaimedCouponMultiPromotions
      formattedPayload["discountInfo"]["unclaimedCouponsMap"] = unclaimedCouponsMap
      formattedPayload["order"]["commerceItems"] = commerceItems
      formattedPayload["order"]["priceInfo"]["orderTotalBySite"] = orderTotalBySite
      res.status(200).json(formattedPayload)
    }
    catch(err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  }
}

export default OrdersController