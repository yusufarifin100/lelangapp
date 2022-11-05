import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/userseller')
  .post(userCtrl.createSeller)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

router.route('/api/user_ktp/image/:userId')
  .get(userCtrl.ktpImage)

router.route('/api/user_ktp/defaultphoto')
  .get(userCtrl.defaultKtpImage)

router.route('/api/list_verify_seller').get(authCtrl.requireSignin, userCtrl.listNotVerifiedSeller)

router.route('/api/detail_seller/:userId').get(authCtrl.requireSignin, userCtrl.readSeller)

router.route('/api/accept_seller/:userId').put(authCtrl.requireSignin, userCtrl.acceptSeller)

router.route('/api/decline_seller/:userId').put(authCtrl.requireSignin, userCtrl.declineSeller)

router.route('/api/list_verify_buyer').get(authCtrl.requireSignin, userCtrl.listNotVerifiedBuyer)

router.route('/api/detail_buyer/:userId').get(authCtrl.requireSignin, userCtrl.readBuyer)

router.route('/api/accept_buyer/:userId').put(authCtrl.requireSignin, userCtrl.acceptBuyer)

router.route('/api/decline_buyer/:userId').put(authCtrl.requireSignin, userCtrl.declineBuyer)

export default router
