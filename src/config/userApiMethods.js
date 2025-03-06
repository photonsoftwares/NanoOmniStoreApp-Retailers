import { showMessage } from "react-native-flash-message";
import { ApiRequest } from "./apiRequests";
import { setLoadingState } from "../ReduxToolkit/features/loadingSlice";
import { BASE_URL } from "./Base_Url";
import { setCategoryData, } from "../ReduxToolkit/features/productSlice";
import { setDeliveredItems, setOrders, } from "../ReduxToolkit/features/orderSlice";
import { setBookedOrders, setCustomerAddresses, setCustomerData } from "../ReduxToolkit/features/customerSlice";
import { addRecommendedPageData, setRecommended, setRecommendedCurrentPage, } from "../ReduxToolkit/features/recommendedSlice";
import { setCategoriesData, } from "../ReduxToolkit/features/categoriesSlice";
import { addCategoriesItemPageData, setCategoryItemsData, setCurrentCategoryItemPage } from "../ReduxToolkit/features/categoryItemsSlice";
import { addItemCart, totalInVoiceCart, } from "../ReduxToolkit/features/cartSlice";
import { showToast } from "../utils/toast";
import { setSearch } from "../ReduxToolkit/features/searchSlice";
import { setSalesReport } from "../ReduxToolkit/features/salesReport";
import axios from "axios";
import { setSalesSummary } from "../ReduxToolkit/features/salesSummary";
import { setExtraDeliveryChargesValue, setExtraMinOrderValue } from "../ReduxToolkit/features/extraChargesSlice";
import { setCustomerList } from "../ReduxToolkit/features/customerList";
import { setAllRetailerWallet, setRetailerWallet, setWallet } from "../ReduxToolkit/features/walletSlice";
import { setCoupan } from "../ReduxToolkit/features/coupanSlice";
import { setMasterCategoryData, setSubCategoryCategory, setSubCategoryItemsData, setSubCategoryItemsTotalPage } from "../ReduxToolkit/features/mainCategorySlice";
import { addInventoryMoreData, setInventory, setInventoryCurrentPage } from "../ReduxToolkit/features/InventorySlice";
import { setDashboard } from "../ReduxToolkit/features/dashboardSlice";






export const OrderViewOrderMethod = (page = 1) => async (dispatch, getState) => {
    // console.log('OrderViewOrderMethod_props', storeId, saasId, page);
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    dispatch(setLoadingState(true));
    // console.log(page)

    try {
        const endUrl = `${BASE_URL}order/view-order/${saasId}/${storeId}`;

        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);

            console.log('OrderViewOrderMethod_resp', endUrl, response?.data.length);
            if (response?.status === true && response?.data?.length > 0) {

                dispatch(setOrders(response?.data));

                return response?.data;
            } else {
                showToast("No Orders")

            }



        } catch (error) {
            console.error("TestMethod API request error:", error);

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showToast("something error")

        dispatch(setLoadingState(false));
    }
};


export const OrderViewOneMethod = (storeId, saasId, order_id) => async (dispatch, getState) => {
    // console.log("OrderViewOrderOne", storeId, saasId,order_id)

    try {
        const endUrl = `${BASE_URL}order/view-order-detail-web/${storeId}/${saasId}/${order_id}`;
        // console.log(endUrl)

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);

        console.log('OrderViewOneMethod_resp', endUrl, response);

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

    try {
        const endUrl = `${BASE_URL}order/get-ordermaster-details/${saasId}/${storeId}/${order_id}`;

        const headers = {};
        const method = 'GET';
        let response = await ApiRequest(endUrl, method, headers);

        console.log('GetOrderMasterDetails_Resp', endUrl, response?.data);
        if (response?.status) {
            await dispatch(setCustomerData(response?.data));
            await dispatch(GetCustomerAddressMethod(storeId, saasId, response?.data?.address_id))


        }

        return response?.status;
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

        // console.log('GetCustomerAddress_rep', responser);
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

export const SaveTransactionMethod = (data, orderIdd, selectedOption) => async (dispatch, getState) => {
    // console.log("SaveTransaction_props", data)

    try {
        const endUrl = `${BASE_URL}transaction/save-transaction`;
        const headers = {};
        const body = JSON.stringify(data);
        const method = 'Post';

        console.log("SaveTransaction_before", body)
        let response = await ApiRequest(endUrl, method, headers, body);

        console.log('SaveTransaction_resp', response, body, endUrl);
        if (response?.status) {
            showMessage({
                message: `Invoice is Loading`,
                type: "success",
            })
            await dispatch(DeleteAllCartMethod())
            await dispatch(UpdateOrderStatusMethod(orderIdd, selectedOption))

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
export const SaveTransactionBillingMethod = (data, orderIdd) => async (dispatch, getState) => {
    // console.log("SaveTransaction_props",)

    try {
        const endUrl = `${BASE_URL}transaction/save-transaction`;

        const headers = {};
        const body = data;
        const method = 'Post';

        // console.log("SaveTransaction_before", endUrl, body)
        let response = await ApiRequest(endUrl, method, headers, body);

        console.log('SaveTransaction_resp for billing', response, body, endUrl);
        if (response?.status) {
            showMessage({
                message: `Invoice is Loading`,
                type: "success",
            })
            await dispatch(DeleteAllCartMethod())
            await dispatch(OrderViewOrderMethod())


        } else {
            showMessage({
                message: `${response.message}`,
                type: "danger",
            })
        }

        console.log("response?.data?.pdf_file_name", response)
        return response?.data?.pdf_file_name
    } catch (error) {
        showMessage({
            message: "Network Error " `${error}`,
            type: "danger",
        })
    }

};

export const UpdateOrderMasterMethod = (orderId) => async (dispatch, getState) => {
    // console.log("UpdateOrderMasterMethod_props", orderId)

    const data = {
        "order_id": `${orderId}`,
        "status": "Invoiced"
    }

    try {
        const endUrl = `${BASE_URL}order/update/order/master/${orderId}`;

        const headers = {};
        const body = data;
        const method = 'Put';
        let response = await ApiRequest(endUrl, method, headers, body);

        // console.log('UpdateOrderMasterMethod_resp', response);
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


export const UpdateOrderStatusMethod = (orderIdd, status = 'DELIVERYBOY') => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log("UpdateOrderStatusMethod", orderIdd, status)

    try {
        const endUrl = `${BASE_URL}order/update-status/${storeId}/${saasId}/${orderIdd}/${status}`;
        const headers = {};
        const method = 'Put';
        let response = await ApiRequest(endUrl, method, headers,);
        console.log("UpdateOrderStatusMethod_Resp", response)
        if (response?.status === true) {
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



export const RecommendedItemMethod = (storeIdd, saasIdd, page = 1) => async (dispatch, getState) => {
    // console.log('RecommendedItemMethod_props', storeId, saasId, page);
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}search/recommended-item/${storeId}/${saasId}/${page}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);
            console.log("RecommendedItemMethod", endUrl, response.data.length)

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

            showToast("No More Data available")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showToast("something error")

        dispatch(setLoadingState(false));
    }
};



export const ItemUpdateMethod = (data, itemId, storeId, saasId, recommendedCurrentPage) => async dispatch => {

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}item/update-item/${itemId}`;
        const method = "PUT";
        const headers = {};
        const body = data

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            if (response?.status === true) {

                dispatch(RecommendedItemMethod(storeId, saasId, 1));


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
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const CategoryItemUpdateMethod = (data, itemId, storeId, saasId, recommendedCurrentPage) => async (dispatch, getState) => {
    // console.log("CategoryItemUpdateMethod",data)


    try {
        const endUrl = `${BASE_URL}item/update-item/${itemId}`;
        const method = "PUT";
        const headers = {};
        const body = data

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            // console.log('CategoryItemUpdateMethod_resp', response?.data?.price, endUrl);

            if (response?.status == true) {

                dispatch(GetSubCategoryItemsMethod(response?.data?.category));
                dispatch(RecommendedItemMethod(storeId, saasId))

                return response
            } else {
                showToast("Unknown error occurred")

            }

        } catch (error) {
            showToast(error.message || "Unknown error occurred")
        } finally {
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showToast("something error")
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
            console.log('GetCategoryItemMethod_resp', endUrl, response?.data?.length);

            if (response?.status === true) {
                dispatch(setCategoriesData(response?.data));


                return response?.data;
            } else {
                showToast("No Category item available")

            }

        } catch (error) {
            showToast("No Category item available")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};



export const GetSelectedCategoryItemsMethod = (categoryName) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { categoryItemsCurrentPage } = getState().categoryItemsReducer;

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${categoryItemsCurrentPage}`;

        try {
            const response = await ApiRequest(endUrl, method, headers);
            // console.log("GetSelectedCategoryItemsMethod_rep", endUrl, response)


            if (response?.status === true) {
                if (categoryItemsCurrentPage === 1) {
                    dispatch(setCategoryItemsData(response?.data));
                    dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1));
                } else {
                    const items = response?.data == null ? [] : response?.data;
                    dispatch(addCategoriesItemPageData(response?.data));
                    dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1));
                }
                return response?.data;
            } else {
                // Handle case when no more category data is available
            }
        } catch (error) {
            // Handle API request error
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // Handle unexpected error
        showToast("something error")

        dispatch(setLoadingState(false));
    }
};



export const GetSearchItemsMethod = (searchText) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // console.log('GetSearchItemsMethod_props', storeId, saasId, page,categoryItemsCurrentPage);


    try {
        const endUrl = `${BASE_URL}search/get-result/${storeId}/${saasId}/${searchText}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);
            // console.log('GetSearchItemsMethod_resp', response?.data.length);

            if (response?.status === true) {
                dispatch(setSearch(response?.data))
                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")
    }
};

export const SearchWalletItemsMethod = (searchText) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log('SearchWalletItemsMethod_props', storeId, saasId, searchText);


    try {
        const endUrl = `${BASE_URL}wallet/get-customer-wallet/${storeId}/${saasId}/${searchText}`;
        const method = "GET";
        const headers = {};

        try {
            const response = await ApiRequest(endUrl, method, headers);
            console.log('SearchWalletItemsMethod_resp', response);

            if (response?.status === true) {
                dispatch(setAllRetailerWallet(response?.data))
                return response?.data;
            } else {
                showToast("SearchWalletItemsMethod fail")
            }

        } catch (error) {

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")
    }
};


export const AddToCartMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log('AddToCartMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}price-check/addproduct/${saasId}/${storeId}/${userId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            if (response?.status === true) {
                dispatch(addItemCart(response?.data?.products));

                return true;
            } else {
                showToast("No  Data available")

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
        showToast("something error")
        dispatch(setLoadingState(false));
    }

};

export const GetCartMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;



    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}price-check/getcart/${saasId}/${storeId}/${userId}`;
        try {
            const response = await ApiRequest(endUrl, method, headers,);

            console.log('GetCartMethod_resp', endUrl, response?.data?.products.length);
            if (response?.status === true) {

                await dispatch(addItemCart(response?.data?.products));
                const totalInvoiceAmountString = response?.total_invoice_amount.toString();
                await dispatch(totalInVoiceCart(totalInvoiceAmountString));




                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            showToast("No More Data available")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const DeleteAllCartMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    dispatch(setLoadingState(true));

    try {
        const method = "delete";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/delete-all-products/${saasId}/${storeId}/${userId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            if (response?.status === true) {
                dispatch(GetCartMethod());

                return response?.data;
            }

        } catch (error) {
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const DeleteOneMethod = (itemId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    try {
        const method = "delete";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/deleteproduct/${saasId}/${storeId}/${userId}/${itemId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            if (response?.status === true) {
                dispatch(GetCartMethod());



                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            showToast("something error")
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const UpdateCartItemQntyMethod = (itemId, qty,) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/updateproduct/${qty}/${saasId}/${storeId}/${userId}/${itemId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,);

            if (response?.status === true) {
                dispatch(GetCartMethod());



                return response?.data;
            } else {
                throw new Error("No products found in the response");
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
        showToast("something error")
        dispatch(setLoadingState(false));
    }

};

export const CreateOrderMethod = (data) => async (dispatch, getState) => {


    dispatch(setLoadingState(true));

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}order/create/order/master`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            if (response?.status === true) {

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {

            showToast("No More Data available")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

//main
export const uploadImageMethod = async (itemId, selectedImage) => {
    var assets = selectedImage?.assets;


    if (assets !== null && assets?.length > 0) {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedImage.assets[0].uri,
                type: selectedImage.assets[0].type,
                name: selectedImage.assets[0].fileName,
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

            showMessage({
                message: "Item Added Succesfully",
                type: "success",
            })
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
        }

    } else {
        showMessage({
            message: "Item Saved without Image ",
            type: "success",
        })

    }


};









export const AddNewItemMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;


    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}item/add-item`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            if (response?.status) {
                showMessage({
                    message: `${response?.message}`,
                    type: "success",
                })
                dispatch(setCurrentCategoryItemPage(1))
                dispatch(GetSubCategoryItemsMethod(response?.data?.category))


            } else {
                showMessage({
                    message: `${response.message}`,
                    type: "danger",
                })
            }
            return response
        } catch (error) {
            showMessage({
                message: "Error fetching data",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
        }
    } catch (error) {
        showToast("something error")

    }

};

export const AddSubCategoryMethod = (data, masterCategoryId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log("AddMasterCategoryMethod_Data", data)


    try {
        const endUrl = `${BASE_URL}category/store/category`;
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            console.log('AddSubCategoryMethod_rep', response?.data);

            if (response?.status === true) {
                dispatch(GetSubCategoryMethod(masterCategoryId))
                showToast("New Sub-Category Successfully Added")

                return response;
            } else {
                showToast("New Category Added fail")


            }

        } catch (error) {
            showToast("Error in Category add method")

        } finally {
            dispatch(setLoadingState(false));
        }
        return response?.status;

    } catch (error) {
        showToast("Error in AddSubCategoryMethod")

        dispatch(setLoadingState(false));
    }

};

export const AddMasterCategoryMethod = (data) => async (dispatch, getState) => {


    try {
        const endUrl = `${BASE_URL}Master-category/master/category`;
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            if (response?.status === true) {
                dispatch(GetMasterCategoryMethod())
                showToast("New Category Successfully Added")



                return response;
            } else {
                showToast("New Category Added fail")


            }

        } catch (error) {
            showToast("Error in Category add method")

        } finally {
            dispatch(setLoadingState(false));
        }
        return response?.status;

    } catch (error) {
        showToast("Error in Category add method")

        dispatch(setLoadingState(false));
    }

};


export const GetMasterCategoryMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log('GetMasterCategoryMethod_props', storeId, saasId,);

    const method = "GET";
    const headers = {};
    const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}Master-category/get-list-master/${saasId}/${storeId}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('GetMasterCategoryMethod_resp', endUrl, response);

        if (response?.status) {
            // Handle successful response
            dispatch(setMasterCategoryData(response?.data))

            return response;
        } else {
            showToast(response.message);
        }
    } catch (error) {
        showToast(`${error} Error in GetMasterCategoryMethod`);
    }
};

export const PutMasterCategoryMethod = (id, data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    const method = "PUT";
    const headers = {};
    const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}Master-category/update-detail/${id}/${data}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);

        if (response?.status) {
            dispatch(GetMasterCategoryMethod())

            return response;
        } else {
            showToast(response.message);
        }
    } catch (error) {
        showToast(`${error} Error in PutMasterCategoryMethod`);
    }
};

export const deleteMasterCategoryMethod = (id) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    const method = "DELETE";
    const headers = {};
    const endUrl = `${BASE_URL}Master-category/delete-detail/${id}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('deleteMasterCategoryMethod_resp', endUrl, response);

        if (response?.status) {
            dispatch(GetMasterCategoryMethod())

            return response;
        } else {
            showToast(response.message);
        }
    } catch (error) {
        showToast(`${error} Error in deleteMasterCategoryMethod`);
    }
};

export const GetSubCategoryMethod = (masterCategoryId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    const method = "GET";
    const headers = {};
    const endUrl = `${BASE_URL}Master-category/get-list/${saasId}/${storeId}/${masterCategoryId}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);

        if (response?.status) {
            dispatch(setSubCategoryCategory(response?.data))
            dispatch(GetSubCategoryItemsMethod(response?.data[0]?.category))

            return response;
        } else {
            if (response?.message == "No data found") {
                dispatch(setSubCategoryItemsData([]))
                dispatch(setSubCategoryCategory([]))

            } else {

                dispatch(setSubCategoryCategory([]))
                showToast(response.message);
            }

        }
    } catch (error) {
        showToast(`${error} Error in GetSubCategoryMethod`);
    }
};

export const GetMainAndSubCategoryMethod = (masterCategoryId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    try {
        const resp = await dispatch(GetMasterCategoryMethod())
        const resp1 = await dispatch(GetSubCategoryMethod(resp?.data[0]?.masterCategoryId))
        const resp2 = await dispatch(GetSubCategoryItemsMethod(resp1?.data[0]?.category))

        if (response?.status) {

        } else {

        }
    } catch (error) {
        showToast(`${error} Error in GetSubCategoryMethod`);
    }
};

export const GetSubCategoryItemsMethod = (categoryName) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { subCategoryItemsPage, subCategoryItems, } = getState()?.mainCategoryReducer

    const method = "GET";
    const headers = {};
    const endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${subCategoryItemsPage}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log(response?.data.length)

        if (response?.status) {
            dispatch(setSubCategoryItemsData(response?.data))
            // if (subCategoryItemsPage == 1) {
            //     // dispatch(setSubCategoryItemsData(response?.data))
            //     // dispatch(setSubCategoryItemsTotalPage(response?.count / 12))
            // } else {
            //     if (response?.next == null) {
            //         dispatch(setSubCategoryItemsData([...subCategoryItems, ...response?.data]))

            //         showToast("No More Data")
            //         console.log("response?.next == null", response?.next == null)
            //     } else {
            //         dispatch(setSubCategoryItemsData([...subCategoryItems, ...response?.data]))
            //     }
            // }
        } else {
            dispatch(setSubCategoryItemsData([]))
        }
    } catch (error) {
        showToast(`${error} Error in GetSubCategoryItemsMethod`);
    }
};



export const GetCategoryMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}category/get-list/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,);
            if (response?.status) {


                dispatch(setCategoryData(response?.data))
            }
            return response?.data
        } catch (error) {
            showMessage({
                message: "Error fetching categpry",
                description: error.message || "Unknown error occurred",
                type: "danger",
            });
        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};


export const GetgetSalesReportMethod = (startDateprops) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { salesReportData, startDate } = getState()?.salesReportReducer;

    const date = await startDateprops == undefined ? startDate : startDateprops


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}tax/get-sales-report/${date}/${storeId}/${saasId}`;

        const response = await ApiRequest(endUrl, method, headers);
        console.log("GetgetSalesReportMethod_End", endUrl, response)

        if (response?.status === true) {
            await dispatch(setSalesReport(response?.list_sales_report));
            return response?.status;
        } else {
            throw new Error("No Reports");
        }
    } catch (error) {
        showToast("Something went wrong");
    }
};



export const GetgetSalesSummarytMethod = (fromDate, toDate) => async (dispatch, getState) => {
    const { storeId, saasId } = getState()?.authReducer?.user?.user_data
    const { startDate } = getState()?.salesReportReducer

    const date = await fromDate == undefined ? startDate : fromDate

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}dashboard/get-invoices-detatils/${saasId}/${storeId}/${date}/${toDate}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("GetgetSalesSummarytMethod_endUrl", endUrl, response)

            if (response?.status === true) {
                await dispatch(setSalesSummary(response?.data))

                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            showToast("something error")


        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")
        dispatch(setLoadingState(false));
    }

};


export const UpdateDeliveryChargesMethod = (charges) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    const charge = charges || 0

    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/update-delivery-charges/${store_per_id}/${saasId}/${storeId}/${charge}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            if (response?.status === true) {
                // console.log("UpdateDeliveryChargesMethod_resp_inside", response);
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
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};


export const UpdateMinOrderValueMethod = (charges) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    const charge = charges || 0
    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/update-minimum-order-value/${store_per_id}/${saasId}/${storeId}/${charge}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                await dispatch(GetMinOrderValueMethod())
                showMessage({
                    message: "Minimum value succesfully updated ",
                    type: "success",
                });


                return response?.status
            } else {
                showToast("something error")

            }

        } catch (error) {
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const GetMinOrderValueMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/get-minimum-order-value/${store_per_id}/${saasId}/${storeId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                dispatch(setExtraMinOrderValue(response?.data?.minimum_order_response))


                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const GetDelivryChargesMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/get-delivery-charges/${store_per_id}/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                dispatch(setExtraDeliveryChargesValue(response?.data?.deliver_charges))
                return response?.status
            } else {
                throw new Error("No Summary Reports");
            }

        } catch (error) {
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const GetCustomerMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}digital-promotion/get-customer-list/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status == true) {
                dispatch(setCustomerList(response?.data))

                return response?.status
            } else {
                showToast("something error in GetCustomerMethod")

            }

        } catch (error) {
            showToast("something error in GetCustomerMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in GetCustomerMethod")

        dispatch(setLoadingState(false));
    }

};

export const CreateWalletMethod = (data) => async (dispatch, getState) => {

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}wallet/create-wallet`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)
            console.log("CreateWalletMethod_response", response, endUrl)

            if (response?.status == true) {
                showToast("wallet created")
            } else {
                showToast(response?.message + ' please update')

            }
            return response
        } catch (error) {
            showToast("something error in CreateWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in CreateWalletMethod")

        dispatch(setLoadingState(false));
    }
};

export const UpdateWalletMethod = (data, selectedOption) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data


    try {
        const method = "PUT";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}wallet/update-balance/${data?.walletId}/${storeId}/${data?.balance}/${selectedOption}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("UpdateWalletMethod_response", response, endUrl)

            if (response?.status == true) {
                showToast(response?.message)
                dispatch(GetAllWalletMethod())

            }
            return response
        } catch (error) {
            showToast("something error in UpdateWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in UpdateWalletMethod")

        dispatch(setLoadingState(false));
    }

};


export const GetAllWalletMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    dispatch(setLoadingState(true));


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}wallet/get-all-wallet/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("GetAllWalletMethod_Resp", response)
            dispatch(setWallet(response?.data))

        } catch (error) {
            showToast("something error in GetCustomerMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in GetCustomerMethod")

        dispatch(setLoadingState(false));
    }
};

export const CreateRetailerWalletMethod = (data) => async (dispatch, getState) => {

    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}wallet/create-retailer-wallet`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)
            console.log("CreateWalletMethod_response", response, endUrl)

            if (response?.status == true) {
                showToast("Balance added Succesfully ")
                dispatch(GetRetailerWalletMethod())
            } else {

            }
            return response
        } catch (error) {
            showToast("something error in CreateRetailerWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in CreateRetailerWalletMethod")
    }
};

export const GetRetailerWalletMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}wallet/get-retailer-wallet/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            dispatch(setRetailerWallet(response?.data?.amount))

        } catch (error) {
            showToast("something error in GetRetailerWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in GetRetailerWalletMethod")
    }
};

export const UpdateRetailerWalletMethod = (data) => async (dispatch, getState) => {

    try {
        const method = "PUT";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}wallet/update-retailer-wallet`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)

            if (response?.status == true) {
                showToast("Balance updated Succesfully ")
                dispatch(GetRetailerWalletMethod())
            }
            return response
        } catch (error) {
            showToast("something error in UpdateRetailerWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in UpdateRetailerWalletMethod")
    }
};

export const CreateCoupanMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}coupon/create-coupon`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)
            console.log("CreateCoupanMethod_response", response)

            if (response?.status == true) {
                showToast("coupon created")


            }
            return response
        } catch (error) {
            showToast("something error in CreateCoupanMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in CreateCoupanMethod")
        dispatch(setLoadingState(false));
    }
};

export const GetAllCoupanMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    dispatch(setLoadingState(true));


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}coupon/get-all-coupon-store/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("GetAllCoupanMethod_Resp", response?.data?.length, endUrl)
            dispatch(setCoupan(response?.data))

        } catch (error) {
            showToast("something error in GetAllCoupanMethod")

        } finally {
            dispatch(setLoadingState(false))
        }
    } catch (error) {
        showToast("something error in GetAllCoupanMethod")

        dispatch(setLoadingState(false));
    }

};




export const setFcmTokenMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data

    console.log("setFcmTokenMethod_data", data, userId)


    try {
        const headers = {};
        const body = data;
        const method = 'POST';
        const endUrl = `${BASE_URL}customer/save-Fmc-Token-retailer/${userId}/${body}`;


        let response = await ApiRequest(endUrl, method, headers, body);
        console.log("setFcmTokenAction response", response);

        if (response?.status) {

        }
        else {

        }
        return response;
    } catch (error) {
        showToast("something error")

    }



};



export const getOrderItemDetailMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data


    dispatch(setLoadingState(true));

    try {
        const headers = {};
        const body = data;
        const method = 'GET';
        const endUrl = `${BASE_URL}order/get-order-details-list/${saasId}/${storeId}/${data}`;


        let response = await ApiRequest(endUrl, method, headers, body);

        if (response?.status) {
            7
            await dispatch(setDeliveredItems(response?.data?.order_sub_details))
            dispatch(setLoadingState(false));

        }
        else {
            dispatch(setLoadingState(false));

        }
        return response;
    } catch (error) {
        showMessage({
            message: error,
            type: "danger",
        })
        dispatch(setLoadingState(false));


    }



};





export const deleteCategoryMethod = (data, masterCategoryId) => async (dispatch, getState) => {


    console.log("deleteCategoryMethod_data", data)

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}category/delete-detail/${data}`;
        const method = "DELETE";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers,);
            console.log('deleteCategoryMethod_rep', response);

            if (response?.status === true) {
                dispatch(GetSubCategoryMethod(masterCategoryId))
                dispatch(GetCategoryItemMethod())
                showToast("Category Successfully Deleted")



                return response?.status;
            } else {
                showToast("New Category delete fail")


            }

        } catch (error) {
            showToast("Error in Category delete method")

        } finally {
            dispatch(setLoadingState(false));
        }
        return response?.status;

    } catch (error) {
        showToast("Error in Category delete method")

        dispatch(setLoadingState(false));
    }

};

export const updateCategoryMethod = (data, categoryId) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // const { categoryCurrentPage } = getState().categoriesReducer;



    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}category/update-detil/${categoryId}`;
        const method = "PUT";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            console.log('updateSUbCategory_rep', response, endUrl, body);

            if (response?.status === true) {
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);

                // dispatch(GetCategoryItemMethod())
                showToast("Category Successfully Updated")



                return response;
            } else {
                showToast("Category Updated fail")


            }

        } catch (error) {
            showToast("Error in Category Update method")

        } finally {
            dispatch(setLoadingState(false));
        }
        return response?.status;

    } catch (error) {
        showToast("Error in Category update method")

        dispatch(setLoadingState(false));
    }

};




export const GetQRItemMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log('GetQRItemMethod_props', storeId, saasId, data);

    const method = "GET";
    const headers = {};
    const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}item/view-item-detil/${data}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('GetQRItemMethod_resp', endUrl, response);

        if (response?.status) {
        } else {
            showToast('Item not available Please try another bar code');

        }
        return response;

    } catch (error) {
        showToast(`${error} Error in GetQRItemMethod`);
    }
};

export const GetInventoryMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { inventoryCurrentPage } = getState()?.inventoryReducer;

    console.log('GetQRItemMethod_props', storeId, saasId, inventoryCurrentPage);

    const method = "GET";
    const headers = {};
    const endUrl = `${BASE_URL}item/get-item-lists/${saasId}/${storeId}/${inventoryCurrentPage}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        // console.log('GetInventoryMethod_resp', endUrl, response);

        if (response?.status) {
            console.log("inventoryCurrentPage", inventoryCurrentPage)
            if (inventoryCurrentPage == '1') {
                dispatch(setInventory(response?.data || []))
                dispatch(setInventoryCurrentPage(inventoryCurrentPage + 1))
            } else {
                dispatch(addInventoryMoreData(response?.data || []))
                dispatch(setInventoryCurrentPage(inventoryCurrentPage + 1))

            }

        } else {
            showToast(response?.message);

        }
        return response;

    } catch (error) {
        showToast(`${error} Error in GetInventoryMethod`);
    }
};





/////////

export const DashboardMMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    const method = "GET";
    const headers = {};

    const baseUrl = `${BASE_URL}dashboard`;

    const urls = [
        `${baseUrl}/today-sales/${storeId}/${new Date().toISOString().split('T')[0]}`,
        `${baseUrl}/yesterday-sales/${storeId}`,
        `${baseUrl}/last-week-sales/${storeId}`,
        `${baseUrl}/last-fourteen-days-sales/${storeId}`,
        `${baseUrl}/last-month-sales/${storeId}`,
        `${baseUrl}/last-sixty-days-sales/${storeId}`,
    ];

    try {
        const responses = await Promise.all(urls.map(url => ApiRequest(url, method, headers)));

        // Combine or handle the responses as needed
        const [todaySales, yesterdaySales, lastWeekSales, lastFourteenDaysSales, lastMonthSales, lastSixtyDaysSales] = responses;
        const data = {
            todaySales: todaySales?.data || 0,
            yesterdaySales: yesterdaySales?.data || 0,
            lastWeekSales: lastWeekSales?.data || 0,
            lastFourteenDaysSales: lastFourteenDaysSales?.data || 0,
            lastMonthSales: lastMonthSales?.data || 0,
            lastSixtyDaysSales: lastSixtyDaysSales?.data || 0
        }
        // console.log("Dashboard Resp", data)

        dispatch(setDashboard(data))

        return {
            todaySales,
            yesterdaySales,
            lastWeekSales,
            lastFourteenDaysSales,
            lastMonthSales,
            lastSixtyDaysSales,
        };

    } catch (error) {
        showToast(`${error} Error in DashboardMMethod`);
    }
};


export const UpdateOnlineStatusMethod = (storeId) => async (dispatch, getState) => {
    // console.log("UpdateOnlineStatusMethod_props", storeId, saasId, status);

    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/update-online-status/${storeId}`;

        const response = await ApiRequest(endUrl, method, headers);

        console.log('UpdateOnlineStatusMethod_resp', response);

        if (response?.status === true) {
            showMessage({
                message: response.message || "Status updated successfully",
                type: "success",
            });
            return response.data; // Return the updated status (e.g., "Online" or "Offline")
        } else {
            throw new Error(response.message || "Failed to update status");
        }
    } catch (error) {
        console.error("UpdateOnlineStatusMethod API request error:", error);
        showMessage({
            message: "Error updating status",
            description: error.message || "Unknown error occurred",
            type: "danger",
        });
        throw error; // Re-throw the error to handle it in the component
    } finally {
        dispatch(setLoadingState(false));
    }
};