import { showMessage } from "react-native-flash-message";
import { ApiRequest } from "./apiRequests";
import { setLoadingState } from "../ReduxToolkit/features/loadingSlice";
import { BASE_URL } from "./Base_Url";
import { addPageData, setProducts } from "../ReduxToolkit/features/productSlice";
import { addOrdersPageData, setOrders, setOrdersCurrentPage } from "../ReduxToolkit/features/orderSlice";
import { setBookedOrders, setCustomerAddresses, setCustomerData } from "../ReduxToolkit/features/customerSlice";
import { addRecommendedPageData, setRecommended, setRecommendedCurrentPage, } from "../ReduxToolkit/features/recommendedSlice";
import { addCategoriesPageData, setCategoriesData, setCurrentCategoryPage } from "../ReduxToolkit/features/categoriesSlice";
import { addCategoriesItemPageData, setCategoryItemsData, setCurrentCategoryItemPage } from "../ReduxToolkit/features/categoryItemsSlice";
import { addItemCart, totalInVoiceCart, } from "../ReduxToolkit/features/cartSlice";
import { showToast } from "../utils/toast";
import { setSearch } from "../ReduxToolkit/features/searchSlice";
import { setSalesReport } from "../ReduxToolkit/features/salesReport";
import axios from "axios";
import { setSalesSummary } from "../ReduxToolkit/features/salesSummary";
import { setExtraDeliveryChargesValue, setExtraMinOrderValue } from "../ReduxToolkit/features/extraChargesSlice";


export const TestMethod = (storeId, saasId, page = 1) => async dispatch => {
    // console.log('TestMethod_props', storeId, saasId, page);

    dispatch(setLoadingState(true));
    // console.log(page)

    try {
        const endUrl = `http://3.7.230.172:8088/test/api/v1/search/recommended-item/80001/8/${page}`;

        const method = "GET";
        const headers = {};


        try {
            const response = await ApiRequest(endUrl, method, headers);

            console.log('TestMethod_resp', response?.data.length);
            if (response?.status === true) {
                // console.log("TestMethod", response?.data?.length);

                if (page === 1) {
                    dispatch(setProducts(response?.data));
                } else {

                    dispatch(addPageData(response?.data));

                }
                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }



        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};


// OLD
const OrderViewOrderMethodOld = (storeId, saasId, page = 1) => async (dispatch, getState) => {
    // console.log("OrderViewOrder_props", storeId, saasId,)
    dispatch(setLoadingState(true));


    try {
        // const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
        const endUrl = `${BASE_URL}order/view-order/${saasId}/${storeId}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);

        // console.log('OrderViewOrder_resp', response?.data.length);
        // if (response?.status && response?.data?.length > 0) {
        //     // console.log("more then one")
        //     await dispatch({
        //         type: ActionTypes.ORDERVIEWORDER,
        //         payload: response?.data,
        //     });
        // }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};





export const OrderViewOrderMethod = (page = 1) => async (dispatch, getState) => {
    // console.log('OrderViewOrderMethod_props', storeId, saasId, page);
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;


    dispatch(setLoadingState(true));
    // console.log(page)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/search/recommended-item/80001/8/${page}`;
        const endUrl = `${BASE_URL}order/view-order/${saasId}/${storeId}`;

        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);

            // console.log('OrderViewOrderMethod_resp', response?.data.length);
            if (response?.status === true && response?.data?.length > 0) {
                // console.log("TestMethod", response);

                dispatch(setOrders(response?.data));
                // if (page === 1) {
                //     dispatch(setOrdersCurrentPage(page + 1));

                // } else {

                //     dispatch(addOrdersPageData(response?.data));
                //     dispatch(setOrdersCurrentPage(page + 1));


                // }
                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }



        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showToast("Error fetching data")

            // showMessage({
            //     message: "Error fetching data",
            //     description: error.message || "Unknown error occurred",
            //     type: "danger",
            // });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};


export const OrderViewOneMethod = (storeId, saasId, order_id) => async (dispatch, getState) => {
    // console.log("OrderViewOrderOne", storeId, saasId,order_id)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/order/view-order-detail-web/80001/8/47217`
        const endUrl = `${BASE_URL}order/view-order-detail-web/${storeId}/${saasId}/${order_id}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);
        console.log('OrderViewOneMethod', endUrl);

        if (response?.status) {
            await dispatch(setBookedOrders(response?.data));

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};


export const OrderMasterDetailsMethod = (storeId, saasId, order_id) => async (dispatch, getState) => {
    // console.log("GetOrderMasterDetails", storeId, saasId, order_id)
    try {
        const endUrl = `${BASE_URL}order/get-ordermaster-details/${saasId}/${storeId}/${order_id}`;

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);

        // console.log('GetOrderMasterDetails_Resp', response?.data);
        if (response?.status) {
            // console.log("more then one")
            await dispatch(setCustomerData(response?.data));

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};


export const GetCustomerAddressMethod = (storeId, saasId, address_id) => async (dispatch, getState) => {
    // console.log("GetCustomerAddress", storeId, saasId, customer_id)

    try {
        const endUrl = `${BASE_URL}customer/get-address/${saasId}/${storeId}/${address_id}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);

        // console.log('GetCustomerAddress_rep', response?.data);
        if (response?.status) {
            // console.log("more then one"),
            await dispatch(setCustomerAddresses(response?.data));

        }

        return response;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};

export const SaveTransactionMethod = (data, orderIdd) => async (dispatch, getState) => {
    // console.log("SaveTransaction_props", orderIdd)

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/transaction/save-transaction`;
        const endUrl = `${BASE_URL}transaction/save-transaction`;
        // console.log(endUrl)

        const headers = {};
        const body = data;
        const method = 'Post';
        let response = await ApiRequest(endUrl, method, headers, body);

        // console.log('SaveTransaction_resp', response);
        if (response?.status) {
            showMessage({
                message: `Invoice is Loading`,
                type: "success",
            })
            await dispatch(DeleteAllCartMethod())
            await dispatch(UpdateOrderStatusMethod(orderIdd))
            // await dispatch(UpdateOrderMasterMethod(response?.data?.transaction_id));

        } else {
            showMessage({
                message: `${response.message}`,
                type: "danger",
            })
        }


        return response?.data?.pdf_file_name
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};

export const UpdateOrderMasterMethod = (orderId) => async (dispatch, getState) => {
    console.log("UpdateOrderMasterMethod_props", orderId)

    const data = {
        "order_id": `${orderId}`,
        "status": "Invoiced"
    }

    try {
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/transaction/save-transaction`;
        // const endUrl = `http://3.7.230.172:8088/test/api/v1/order/update/order/master/${orderId}`;
        const endUrl = `${BASE_URL}order/update/order/master/${orderId}`;

        const headers = {};
        const body = data;
        const method = 'Put';
        let response = await ApiRequest(endUrl, method, headers, body);

        console.log('UpdateOrderMasterMethod_resp', response);
        if (response?.status) {
            showMessage({
                message: `${response.message}`,
                type: "success",
            })
        } else {
            showMessage({
                message: `${response.message}`,
                type: "danger",
            })
        }

        return response?.data?.pdf_file_name;
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};


export const UpdateOrderStatusMethod = (orderIdd) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log("UpdateOrderStatusMethod_props",)



    try {
        const endUrl = `${BASE_URL}order/update-status/${storeId}/${saasId}/${orderIdd}/delivered`;
        // const endUrl = `${BASE_URL}order/update/order/master/${orderId}`;

        const headers = {};
        const method = 'Put';
        let response = await ApiRequest(endUrl, method, headers,);

        console.log('UpdateOrderStatusMethod_resp', response?.data);
        if (response?.status) {
            // showMessage({
            //     message: `${response.message}kkk`,
            //     type: "success",
            // })
            dispatch(OrderViewOrderMethod())
        } else {
            showMessage({
                message: `${response.message}`,
                type: "danger",
            })
        }

        return response
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};



export const RecommendedItemMethod = (storeId, saasId, page = 1) => async dispatch => {
    // console.log('RecommendedItemMethod_props', storeId, saasId, page);
    // console.log(page)

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);

            // console.log(endUrl)
            // console.log('RecommendedItemMethod_resp', response?.data.length);
            if (response?.status === true) {
                // console.log("RecommendedItemMethod_resp", response?.data?.length);

                if (page === 1) {
                    dispatch(setRecommended(response?.data));
                    dispatch(setRecommendedCurrentPage(page + 1))
                } else {

                    dispatch(addRecommendedPageData(response?.data));
                    dispatch(setRecommendedCurrentPage(page + 1))


                }
                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);

            showMessage({
                message: "No More Data Availabel",
                // description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "info",
            });

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};



export const ItemUpdateMethod = (data, itemId, storeId, saasId, recommendedCurrentPage) => async dispatch => {
    // console.log('ItemUpdateMethod_props', data, itemId);

    dispatch(setLoadingState(true));

    try {
        // const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
        const endUrl = `${BASE_URL}item/update-item/${itemId}`;

        const method = "PUT";
        const headers = {};
        const body = data

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            console.log('ItemUpdateMethod_resp', response, endUrl);
            if (response?.status === true) {

                // console.log("ItemUpdateMethod", response?.data?.length);
                dispatch(RecommendedItemMethod(storeId, saasId, 1));
                // dispatch(GetCartMethod());


                return response
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};


export const GetCategoryItemMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // const { categoryCurrentPage } = getState().categoriesReducer;



    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}category/get-list/${saasId}/${storeId}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);
            // console.log('GetCategoryItemMethod_resp', response?.data?.length);

            if (response?.status === true) {
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);


                dispatch(setCategoriesData(response?.data));


                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            // showToast("Error fetching data")

            showMessage({
                message: "Error fetching data",
                // description: error.message || "Unknown error occurred",
                description: "No Category Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const GetSelectedCategoryItemsMethod = (categoryName) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { categoryItemsCurrentPage } = getState().categoryItemsReducer;

    // console.log('GetSelectedCategoryItemsMethod_props', storeId, saasId, categoryItemsCurrentPage,categoryName,"<>");

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${categoryItemsCurrentPage}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);

            // console.log('GetSelectedCategoryItemsMethod_resp', response?.data.length);
            if (response?.status === true) {
                // console.log("GetSelectedCategoryItemsMethod", response?.data?.length);

                if (categoryItemsCurrentPage === 1) {
                    dispatch(setCategoryItemsData(response?.data));
                    dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1))
                } else {

                    dispatch(addCategoriesItemPageData(response?.data));
                    dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1))


                }
                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            // showToast("Error fetching data")

            // showMessage({
            //     message: "Error fetching data",
            //     // description: error.message || "Unknown error occurred",
            //     description: "No More Data Availabe",
            //     type: "danger",
            // });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};


export const GetSearchItemsMethod = (searchText) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { categoryItemsCurrentPage } = getState().categoryItemsReducer;

    // console.log('GetSearchItemsMethod_props', storeId, saasId, page,categoryItemsCurrentPage);

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}search/get-result/${storeId}/${saasId}/${searchText}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);

            // console.log('GetSearchItemsMethod_resp', response?.data.length);
            if (response?.status === true) {
                // console.log("GetSearchItemsMethod", response?.data.length);

                dispatch(setSearch(response?.data))


                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            // showToast("Error fetching data")

            // showMessage({
            //     message: "Error fetching data",
            //     // description: error.message || "Unknown error occurred",
            //     description: "No More Data Availabe",
            //     type: "danger",
            // });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }
};

export const AddToCartMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('AddToCartMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}price-check/addproduct/${saasId}/${storeId}/${userId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            console.log('AddToCartMethod_resp', response?.data?.products?.length);
            if (response?.status === true) {
                // console.log("AddToCartMethod_resp_inside", response);

                dispatch(addItemCart(response?.data?.products));
                // dispatch(GetCartMethod())


                // if (categoryItemsCurrentPage === 1) {
                //     dispatch(setCurrentCategoryItemPage(page + 1))
                // } else {

                //     dispatch(addCategoriesItemPageData(response?.data));
                //     dispatch(setCurrentCategoryItemPage(page + 1))


                // }

                return true;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const GetCartMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;


    // console.log('GetCartMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}price-check/getcart/${saasId}/${storeId}/${userId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,);

            // console.log('GetCartMethod_resp', response?.data?.products.length);
            if (response?.status === true) {
                // console.log("GetCartMethod_resp_inside", response?.data?.products?.length);

                await dispatch(addItemCart(response?.data?.products));
                const totalInvoiceAmountString = response?.total_invoice_amount.toString();
                // console.log("jo", response?.total_invoice_amount)
                // console.log('<>', typeof(response?.total_invoice_amount), typeof(totalInvoiceAmountString))
                await dispatch(totalInVoiceCart(totalInvoiceAmountString));




                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                // description: error.message || "Unknown error occurred",
                description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const DeleteAllCartMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('DeleteAllCartMethod_props',id, storeId, saasId, );

    dispatch(setLoadingState(true));

    try {
        const method = "delete";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/delete-all-products/${saasId}/${storeId}/${userId}`;
        // const endUrl = `http://3.111.70.84:8089/prod/api/v1/price-check/delete-all-products/${saasId}/${storeId}/${id}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            console.log('DeleteAllCartMethod_resp', response?.data?.products?.length);
            if (response?.status === true) {
                // console.log("TestMethod", response?.data?.length);


                dispatch(GetCartMethod());


                // if (categoryItemsCurrentPage === 1) {
                //     dispatch(setCurrentCategoryItemPage(page + 1))
                // } else {

                //     dispatch(addCategoriesItemPageData(response?.data));
                //     dispatch(setCurrentCategoryItemPage(page + 1))


                // }

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const DeleteOneMethod = (itemId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('DeleteOneMethod_props',id, storeId, saasId,itemId );
    // dispatch(setLoadingState(true));

    try {
        const method = "delete";
        const headers = {};
        // const endUrl = `${BASE_URL}price-check/deleteproduct/${saasId}/${storeId}/${id}/${itemId}`;
        // const endUrl = `http://3.111.70.84:8089/prod/api/v1/price-check/deleteproduct/${saasId}/${storeId}/${userId}/${itemId}`;
        const endUrl = `${BASE_URL}price-check/deleteproduct/${saasId}/${storeId}/${userId}/${itemId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            // console.log('DeleteOneMethod_resp', response?.data?.products?.length);
            // console.log('DeleteOneMethod_resp', response?.data);
            if (response?.status === true) {
                console.log('DeleteOneMethod_resp', response?.data?.products?.length);


                dispatch(GetCartMethod());

                // if (categoryItemsCurrentPage === 1) {
                //     dispatch(setCurrentCategoryItemPage(page + 1))
                // } else {

                //     dispatch(addCategoriesItemPageData(response?.data));
                //     dispatch(setCurrentCategoryItemPage(page + 1))


                // }

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const UpdateCartItemQntyMethod = (itemId, qty,) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    console.log('UpdateCartItemQntyMethod', userId, storeId, saasId, qty, itemId);
    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/updateproduct/${qty}/${saasId}/${storeId}/${userId}/${itemId}`;
        // const endUrl = `http://3.111.70.84:8089/prod/api/v1/price-check/deleteproduct/${saasId}/${storeId}/${id}/${itemId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            // console.log('DeleteOneMethod_resp', response?.data?.products?.length);
            // console.log('UpdateCartItemQntyMethod', response?.data);
            if (response?.status === true) {
                console.log('UpdateCartItemQntyMethod', response?.data?.products?.length);

                dispatch(GetCartMethod());

                // if (categoryItemsCurrentPage === 1) {
                //     dispatch(setCurrentCategoryItemPage(page + 1))
                // } else {

                //     dispatch(addCategoriesItemPageData(response?.data));
                //     dispatch(setCurrentCategoryItemPage(page + 1))


                // }

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const CreateOrderMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('CreateOrderMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}order/create/order/master`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            console.log('CreateOrderMethod_resp', response?.data?.products.length);
            if (response?.status === true) {
                // console.log("TestMethod", response?.data?.length);

                // dispatch(addItemCart(response?.data?.products));

                // if (categoryItemsCurrentPage === 1) {
                //     dispatch(setCurrentCategoryItemPage(page + 1))
                // } else {

                //     dispatch(addCategoriesItemPageData(response?.data));
                //     dispatch(setCurrentCategoryItemPage(page + 1))


                // }

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                // description: error.message || "Unknown error occurred",
                description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const uploadImageMethod = async (itemId, selectedImage) => {

    console.log('uploadImage_props', itemId, selectedImage)
    // setIsLoading(true);
    // setError(null);
    var assets = selectedImage?.assets;


    if (assets !== null && assets?.length > 0) {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedImage.assets[0].uri,
                type: selectedImage.assets[0].type,
                name: selectedImage.assets[0].fileName,
                // name: 'potato.jpg', 
            });

            const response = await axios.post(
                `${BASE_URL}item/save-image/${itemId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Upload response:', response.data);
            showMessage({
                message: "Item Added Succesfully",
                type: "success",
            })
            // Handle successful upload
            // setSelectedImage(null); // Clear selected image after successful upload
        } catch (error) {
            console.error('Upload error:', error);
            // setError(error);
        } finally {
            // setIsLoading(false);
        }

    } else {
        showMessage({
            message: "Item Saved without Image ",
            type: "success",
        })

    }

    // try {
    //     const formData = new FormData();
    //     formData.append('file', {
    //         uri: selectedImage.assets[0].uri,
    //         type: selectedImage.assets[0].type,
    //         name: 'potato.jpg', // Adjust filename as needed
    //     });

    //     const response = await axios.post(
    //         `${BASE_URL}item/save-image/${itemId}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         }
    //     );

    //     console.log('Upload response:', response.data);
    //     // Handle successful upload
    //     // setSelectedImage(null); // Clear selected image after successful upload
    // } catch (error) {
    //     console.error('Upload error:', error);
    //     setError(error);
    // } finally {
    //     setIsLoading(false);
    // }
};


export const AddNewItemMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('AddNewItemMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}item/add-item`;
        // const endUrl = `http://3.111.70.84:8089/prod/api/v1/item/add-item`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            console.log('AddNewItemMethod_resp', response);
            if (response?.status) {
                showMessage({
                    message: `${response?.message}`,
                    type: "success",
                })
                dispatch(DeleteAllCartMethod())
            } else {
                showMessage({
                    message: `${response.message}`,
                    type: "danger",
                })
            }
            return response
        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};




export const GetgetSalesReportMethod = (startDate_props) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const { salesReportData, startDate } = getState()?.salesReportReducer

    // console.log('GetgetSalesReportMethod_props', storeId, saasId, startDate_props);
    const date = await startDate_props == undefined ? startDate : startDate_props
    // console.log(">", startDate,startDate_props)

    dispatch(setLoadingState(true));


    try {
        const method = "GET";
        const headers = {};
        // const endUrl = `${BASE_URL}tax/get-sales-report/${date}/${storeId}/${saasId}`;
        const endUrl = await `${BASE_URL}tax/get-sales-report/${date}/${storeId}/${saasId}`;
        // const endUrl = await `https://pos.photonsoftwares.com/prod/api/v1/tax/get-sales-report/${date}/${storeId}/${saasId}`;
        // console.log("endUrl_Before", endUrl,response)


        try {
            const response = await ApiRequest(endUrl, method, headers,)
            // console.log("endUrl", endUrl, response)

            // console.log('GetgetSalesReportMethod_resp', response?.list_sales_report?.length)
            if (response?.status === true) {
                console.log("GetgetSalesReportMethod_resp_inside", response?.list_sales_report?.length);
                await dispatch(setSalesReport(response?.list_sales_report))

                return response?.status
            } else {
                throw new Error("No Reports");
            }

        } catch (error) {
            // showMessage({
            //     message: "Error fetching data",
            //     description: error.message || "Unknown error occurred",
            //     // description: "No More Data Availabe",
            //     type: "info",
            // });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};


export const GetgetSalesSummarytMethod = (fromDate, toDate) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const { salesReportData, startDate } = getState()?.salesReportReducer

    // console.log('GetgetSalesReportMethod_props', storeId, saasId, startDate_props);
    const date = await fromDate == undefined ? startDate : fromDate
    // console.log(">", date)

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        // const endUrl = `${BASE_URL}dashboard/get-invoices-detatils/${saasId}/2023-12-10/2023-12-26`;
        const endUrl = `${BASE_URL}dashboard/get-invoices-detatils/${saasId}/${date}/${toDate}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("GetgetSalesSummarytMethod_endUrl", endUrl)

            // console.log('GetgetSalesReportMethod_resp', response?.list_sales_report?.length)
            if (response?.status === true) {
                console.log("GetgetSalesSummarytMethod_resp_inside", response?.data?.length);
                await dispatch(setSalesSummary(response?.data))

                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            // showMessage({
            //     message: "Error fetching data",
            //     description: error.message || "Unknown error occurred",
            //     // description: "No More Data Availabe",
            //     type: "danger",
            // });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};


export const UpdateDeliveryChargesMethod = (charges) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    // console.log('GetgetSalesReportMethod_props', storeId, saasId, startDate_props);

    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `http://3.111.70.84:8089/prod/api/v1/store-master/update-delivery-charges/${store_per_id}/${saasId}/${storeId}/${charges}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("UpdateDeliveryChargesMethod_endUrl", endUrl)

            // console.log('GetgetSalesReportMethod_resp', response?.list_sales_report?.length)
            if (response?.status === true) {
                console.log("UpdateDeliveryChargesMethod_resp_inside", response);
                await dispatch(GetDelivryChargesMethod())
                showMessage({
                    message: "Delivery charges succesfully updated ",
                    type: "success",
                });

                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                // description: "No More Data Availabe",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};


export const UpdateMinOrderValueMethod = (charges) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `http://3.111.70.84:8089/prod/api/v1/store-master/update-minimum-order-value/${store_per_id}/${saasId}/${storeId}/${charges}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("UpdateMinOrderValueMethod_endUrl", endUrl)

            if (response?.status === true) {
                console.log("UpdateMinOrderValueMethod_resp_inside", response);
                await dispatch(GetMinOrderValueMethod())
                showMessage({
                    message: "Minimum value succesfully updated ",
                    type: "success",
                });


                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const GetMinOrderValueMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    console.log("GetMinOrderValueMethod")
    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `http://3.111.70.84:8089/prod/api/v1/store-master/get-minimum-order-value/${store_per_id}/${saasId}/${storeId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                console.log("GetMinOrderValueMethod_resp_inside", response?.data?.deliver_charges);
                dispatch(setExtraMinOrderValue(response?.data?.minimum_order_response))


                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showMessage({
            message: "Error fetching data ",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};

export const GetDelivryChargesMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    console.log("GetDelivryChargesMethod")
    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `http://3.111.70.84:8089/prod/api/v1/store-master/get-delivery-charges/${store_per_id}/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                console.log("GetMinOrderValueMethod_resp_inside", response?.data?.deliver_charges);
                dispatch(setExtraDeliveryChargesValue(response?.data?.deliver_charges))
                // showMessage({
                //     message: "Delivery charges succesfully updated ",
                //     type: "success",
                // });

                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            console.log(error.message)
            showMessage({
                message: "Error fetching data ",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showMessage({
            message: "Error fetching data",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        dispatch(setLoadingState(false));
    }

};