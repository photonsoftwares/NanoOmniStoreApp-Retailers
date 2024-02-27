import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTab from './BottomTab'
import NavigationStrings from '../constants/NavigationStrings'
import RenderOrderCancle from '../Screens/AppScreens/Order/RenderOrderCancle/RenderOrderCancle'
import RenderOrderReturn from '../Screens/AppScreens/Order/RenderOrderReturn/RenderOrderReturn'
import RenderOrderDelivery from '../Screens/AppScreens/Order/RenderOrderDelivery/RenderOrderDelivery'
import RenderOrderPending from '../Screens/AppScreens/Order/RenderOrderPending/RenderOrderPending'
import PendingItemWithUserDetails from '../Screens/AppScreens/Order/RenderOrderPending/PendingItemWithUserDetails/PendingItemWithUserDetails'
import GenrateInvoicePdf from '../Screens/AppScreens/Order/RenderOrderPending/PendingItemWithUserDetails/GenrateInvoicePdf/GenrateInvoicePdf'
import Profile from '../Screens/AppScreens/Profile/Profile'
import UpdateItems from '../Screens/AppScreens/Home/Services/UpdateItems/UpdateItems'
import Products from '../Screens/AppScreens/Products/Products'
import AddProducts from '../Screens/AppScreens/Products/AddProducts/AddProducts'
import Cart from '../Screens/AppScreens/Billing/Cart/Cart'
import SelectPaymentMethod from '../Components/SelectPaymentMethod'
import Dashboard from '../Screens/AppScreens/Setting/Dashboard/Dashboard'
import SearchBar from '../Components/SearchBar'
import Sales from '../Screens/AppScreens/Setting/Dashboard/Sales/Sales'
import Tender from '../Screens/AppScreens/Setting/Dashboard/Tender/Tender'
import HourlySale from '../Screens/AppScreens/Setting/Dashboard/HourlySale/HourlySale'
import DailyOps from '../Screens/AppScreens/Setting/Dashboard/DailyOps/DailyOps'
import ExtraCharges from '../Screens/AppScreens/Setting/Dashboard/ExtraCharges/ExtraCharges'
import Test1 from '../Screens/Test/Test1'
import DeliveredItemDetail from '../Screens/AppScreens/Order/RenderOrderDelivery/DeliveredItemDetail'
import Test from '../Screens/Test/Test'
import UpdateCategoryItems from '../Screens/AppScreens/Home/Services/UpdateItems/UpdateCategoryItems'
import SearchItemUpdate from '../Screens/AppScreens/Search/SearchItemUpdate'
import CategoryUpdate from '../Screens/AppScreens/Setting/CategoryUpdate/CategoryUpdate'
import Category from '../Screens/AppScreens/Setting/CategoryUpdate/Category'
import CategoryAdd from '../Screens/AppScreens/Setting/CategoryUpdate/CategoryAdd'

const AppStack = (Stack) => {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings.BOTTOM_TAB}
        component={BottomTab}
      />
      <Stack.Screen
        name={NavigationStrings.PROFILE}
        component={Profile}
      />
      <Stack.Screen
        name={NavigationStrings.RENDERORDERCANCLE}
        component={RenderOrderCancle}
      />
      <Stack.Screen
        name={NavigationStrings.RENDERORDERPENDING}
        component={RenderOrderPending}
      />
      <Stack.Screen
        name={NavigationStrings.RENDERORDERDELIVERD}
        component={RenderOrderDelivery}
      />
      <Stack.Screen
        name={NavigationStrings.DELIVERDITEMDETAIL}
        component={DeliveredItemDetail}
      />
      <Stack.Screen
        name={NavigationStrings.RENDERORDERRETURN}
        component={RenderOrderReturn}
      />

      <Stack.Screen
        name={NavigationStrings.PENDINGITEMWITHUSERDETAILS}
        component={PendingItemWithUserDetails}
      />

      <Stack.Screen
        name={NavigationStrings.GENRATEINVOICEPDF}
        component={GenrateInvoicePdf}
      />

      {/* UpdateItems */}
      <Stack.Screen
        name={NavigationStrings.UPDATEITEMS}
        component={UpdateItems}
      />
      <Stack.Screen
        name={NavigationStrings.UPDATECATEGORYITEMS}
        component={UpdateCategoryItems}
      />
      <Stack.Screen
        name={NavigationStrings.SEARCHITEMUPDATE}
        component={SearchItemUpdate}
      />


      {/* Products */}
      <Stack.Screen
        name={NavigationStrings.PRODUCTS}
        component={Products}
      />
      <Stack.Screen
        name={NavigationStrings.ADDPRODUCTS}
        component={AddProducts}
      />

      {/* Cart */}
      <Stack.Screen
        name={NavigationStrings.CART}
        component={Cart}
      />

      {/* SelectPaymentMethod */}
      <Stack.Screen
        name={NavigationStrings.SELECTPAYMENTMETHOD}
        component={SelectPaymentMethod}
      />

      {/* Dashboard */}
      <Stack.Screen
        name={NavigationStrings.EXTRACHARGES}
        component={ExtraCharges}
      />
      {/* Dashboard */}
      <Stack.Screen
        name={NavigationStrings.DASHBOARD}
        component={Dashboard}
      />
      <Stack.Screen
        name={NavigationStrings.SALES}
        component={Sales}
      />
      <Stack.Screen
        name={NavigationStrings.TENDER}
        component={Tender}
      />
      <Stack.Screen
        name={NavigationStrings.HOURlYSALES}
        component={HourlySale}
      />
      <Stack.Screen
        name={NavigationStrings.DAILYOPS}
        component={DailyOps}
      />
      <Stack.Screen
        name={NavigationStrings.CATEGORY}
        component={Category}
      />
      <Stack.Screen
        name={NavigationStrings.CATEGORYADD}
        component={CategoryAdd}
      />
      <Stack.Screen
        name={NavigationStrings.CATEGORYUPDATE}
        component={CategoryUpdate}
      />

      {/* SearchBar */}
      <Stack.Screen
        name={NavigationStrings.SEARCHBAR}
        component={SearchBar}
      />
      <Stack.Screen
        name={NavigationStrings.TEST}
        component={Test}
      />


    </>
  )
}

export default AppStack

const styles = StyleSheet.create({})