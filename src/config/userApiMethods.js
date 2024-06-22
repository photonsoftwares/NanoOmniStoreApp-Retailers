import { showMessage } from "react-native-flash-message";
import { ApiRequest } from "./apiRequests";
import { setLoadingState } from "../ReduxToolkit/features/loadingSlice";
import { BASE_URL } from "./Base_Url";
import { addPageData, setCategoryData, setProducts } from "../ReduxToolkit/features/productSlice";
import { addOrdersPageData, setDeliveredItems, setOrders, setOrdersCurrentPage } from "../ReduxToolkit/features/orderSlice";
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
import { setCustomerList } from "../ReduxToolkit/features/customerList";
import { setWallet } from "../ReduxToolkit/features/walletSlice";
import { setCoupan } from "../ReduxToolkit/features/coupanSlice";
import { addMoreSubCategoryItemsData, setMasterCategoryData, setSubCategoryCategory, setSubCategoryItemsData, setSubCategoryItemsPage, setSubCategoryItemsTotalPage } from "../ReduxToolkit/features/mainCategorySlice";
import { addInventoryMoreData, setInventory, setInventoryCurrentPage } from "../ReduxToolkit/features/InventorySlice";






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
                showToast("No Orders")

            }



        } catch (error) {
            console.error("TestMethod API request error:", error);

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

        // console.log('OrderViewOneMethod_resp', response);

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

        // console.log('GetOrderMasterDetails_Resp', response?.data);
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

export const SaveTransactionMethod = (data, orderIdd) => async (dispatch, getState) => {
    console.log("SaveTransaction_props", data)

    try {
        const endUrl = `${BASE_URL}transaction/save-transaction`;
        const headers = {};
        const body = JSON.stringify(data);
        const method = 'Post';

        // console.log("SaveTransaction_before", endUrl, body)
        let response = await ApiRequest(endUrl, method, headers, body);

        console.log('SaveTransaction_resp', endUrl, response);
        if (response?.status) {
            showMessage({
                message: `Invoice is Loading`,
                type: "success",
            })
            await dispatch(DeleteAllCartMethod())
            await dispatch(UpdateOrderStatusMethod(orderIdd))

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

        // console.log('SaveTransaction_resp', response);
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


export const UpdateOrderStatusMethod = (orderIdd) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log("UpdateOrderStatusMethod_props",)



    try {
        const endUrl = `${BASE_URL}order/update-status/${storeId}/${saasId}/${orderIdd}/delivered`;
        const headers = {};
        const method = 'Put';
        let response = await ApiRequest(endUrl, method, headers,);
        // console.log('UpdateOrderStatusMethod_resp', response?.data);

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

            if (response?.status === true) {
                console.log("RecommendedItemMethod_resp", response?.data?.length);

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
    // console.log('ItemUpdateMethod_props', data, itemId);

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}item/update-item/${itemId}`;
        const method = "PUT";
        const headers = {};
        const body = data

        try {
            const response = await ApiRequest(endUrl, method, headers, body);

            // console.log('ItemUpdateMethod_resp', response, endUrl)
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
        showToast("something error")

        dispatch(setLoadingState(false));
    }

};

export const CategoryItemUpdateMethod = (data, itemId, storeId, saasId, recommendedCurrentPage) => async (dispatch, getState) => {
    const { categoryCurrentPage, selectedCategory, } = getState().categoriesReducer;
    console.log('ItemUpdateMethod_props', data, itemId, storeId, saasId, recommendedCurrentPage);



    try {
        const endUrl = `${BASE_URL}item/update-item/${itemId}`;
        const method = "PUT";
        const headers = {};
        const body = data

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            // console.log('CategoryItemUpdateMethod_resp', response, endUrl);

            if (response?.status == true) {

                // console.log("ItemUpdateMethod", endUrl, response, response?.data?.category);
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
            // console.log('GetCategoryItemMethod_resp', response?.data?.length);

            if (response?.status === true) {
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);


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
        // console.error("TestMethod unexpected error:", error);
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

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showToast("something error")

        dispatch(setLoadingState(false));
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
            console.log('AddToCartMethod_resp', endUrl, response?.data?.products?.length);

            if (response?.status === true) {
                // console.log("AddToCartMethod_resp_inside", response);

                dispatch(addItemCart(response?.data?.products));

                return true;
            } else {
                showToast("No  Data available")

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
        showToast("something error")

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

            console.log('GetCartMethod_resp', endUrl, response?.data?.products.length);
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

export const DeleteAllCartMethod = () => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;

    // console.log('DeleteAllCartMethod_props',id, storeId, saasId, );

    dispatch(setLoadingState(true));

    try {
        const method = "delete";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/delete-all-products/${saasId}/${storeId}/${userId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            // console.log('DeleteAllCartMethod_resp', response?.data?.products?.length);
            if (response?.status === true) {
                dispatch(GetCartMethod());

                return response?.data;
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
        showToast("something error")

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
        const endUrl = `${BASE_URL}price-check/deleteproduct/${saasId}/${storeId}/${userId}/${itemId}`;


        try {
            const response = await ApiRequest(endUrl, method, headers,);

            if (response?.status === true) {
                // console.log('DeleteOsneMethod_resp', response?.data?.products?.length);
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

    // console.log('UpdateCartItemQntyMethod', userId, storeId, saasId, qty, itemId);
    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}price-check/updateproduct/${qty}/${saasId}/${storeId}/${userId}/${itemId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,);
            // console.log("UpdateCartItemQnstyMethod_response", response)

            if (response?.status === true) {
                // console.log('UpdateCsartItemQntyMethod', response?.data?.products?.length);

                dispatch(GetCartMethod());



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
        showToast("something error")

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

            ('CreateOrderMethod_resp', response?.data?.products.length);
            if (response?.status === true) {

                return response?.data;
            } else {
                throw new Error("No products found in the response");
            }

        } catch (error) {
            // console.error("TestMethod API request error:", error);
            // showMessage({
            //     message: "Error fetching data",
            //     // description: error.message || "Unknown error occurred",
            //     description: "No More Data Availabe",
            //     type: "danger",
            // });
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

//main
export const uploadImageMethod = async (itemId, selectedImage) => {

    // console.log('uploadImage_props', itemId, selectedImage)
    var assets = selectedImage?.assets;


    if (assets !== null && assets?.length > 0) {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedImage.assets[0].uri,
                type: selectedImage.assets[0].type,
                name: selectedImage.assets[0].fileName,
            });

            // console.log("formData", formData)
            const response = await axios.post(
                `${BASE_URL}item/save-image/${itemId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // console.log('Upload response:', response.data);
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


};









export const AddNewItemMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    console.log('AddNewItemMethod_props', storeId, saasId, data);


    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}item/add-item`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            console.log('AddNewItemMethod_resp', response);

            if (response?.status) {
                showMessage({
                    message: `${response?.message}`,
                    type: "success",
                })
                dispatch(setCurrentCategoryItemPage(1))
                dispatch(GetSubCategoryItemsMethod(response?.data?.category))
                console.log("dispatch(GetSelectedCategoryItemsMethod(response?.data?.category?.category))", response?.data?.category)


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
        // const endUrl = `${BASE_URL}Master-category/master/category`;
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            console.log('AddSubCategoryMethod_rep', response?.data);

            if (response?.status === true) {
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);

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
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // console.log("AddMasterCategoryMethod_Data", data)


    try {
        // const endUrl = `${BASE_URL}category/store/category`;
        const endUrl = `${BASE_URL}Master-category/master/category`;
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            // console.log('AddCategoryMethod_rep', response?.data);

            if (response?.status === true) {
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);

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
    console.log('GetMasterCategoryMethod_props', storeId, saasId,);

    const method = "PUT";
    const headers = {};
    const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}Master-category/update-detail/${id}/${data}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('PutMasterCategoryMethod_resp', endUrl, response);

        if (response?.status) {
            // Handle successful response
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
    console.log('deleteMasterCategoryMethod_props', storeId, saasId,);

    const method = "DELETE";
    const headers = {};
    const endUrl = `${BASE_URL}Master-category/delete-detail/${id}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('deleteMasterCategoryMethod_resp', endUrl, response);

        if (response?.status) {
            // Handle successful response
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
    // console.log('GetSubCategoryMethod_props', storeId, saasId,);

    const method = "GET";
    const headers = {};
    // const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}Master-category/get-list/${saasId}/${storeId}/${masterCategoryId}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        // console.log('GetSubCategoryMethod_resp', endUrl, response);

        if (response?.status) {
            // Handle successful response
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
    // console.log('GetSubCategoryMethod_props', storeId, saasId,);

    try {
        const resp = await dispatch(GetMasterCategoryMethod())
        const resp1 = await dispatch(GetSubCategoryMethod(resp?.data[0]?.masterCategoryId))
        const resp2 = await dispatch(GetSubCategoryItemsMethod(resp1?.data[0]?.category))

        if (response?.status) {
            // Handle successful response

        } else {

        }
    } catch (error) {
        showToast(`${error} Error in GetSubCategoryMethod`);
    }
};

export const GetSubCategoryItemsMethod = (categoryName) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { subCategoryItemsPage, selectedSubCategory, subCategoryItems,subCategoryItemsTotalPage } = getState()?.mainCategoryReducer
    // console.log('GetSubCategoryItemsMethod_props', storeId, saasId, subCategoryItemsPage, selectedSubCategory);

    const method = "GET";
    const headers = {};
    const endUrl = `${BASE_URL}item/get-category-list/${saasId}/${storeId}/${categoryName}/${subCategoryItemsPage}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('GetSubCategoryItemsMethod_resp', endUrl, response?.data?.length);

        if (response?.status) {
            console.log("true")
            // dispatch(setSubCategoryItemsData(response?.data))
            if (subCategoryItemsPage == 1) {
                console.log("1")
                dispatch(setSubCategoryItemsData(response?.data))
                dispatch(setSubCategoryItemsTotalPage(response?.count/12))
            } else {
                console.log("2")
                if (response?.next == null) {
                    dispatch(addMoreSubCategoryItemsData(subCategoryItems))
                    showToast("No More Data")
                } else {
                    dispatch(addMoreSubCategoryItemsData(response?.data))
                }
            }


        } else {
            console.log("false")
            dispatch(setSubCategoryItemsData([]))
        }

        // if (response?.status) {
        //     // Handle successful response
        //     if (subCategoryItemsPage == 1) {
        //         console.log("1")
        //         dispatch(setSubCategoryItemsData(response?.data))
        //         // dispatch(setSubCategoryItemsPage(subCategoryItemsPage + 1))
        //     } else {
        //         console.log("2")
        //         dispatch(addMoreSubCategoryItemsData(response?.data))
        //     }

        //     return response;
        // } else {
        //     if (response?.count == 1) {
        //         dispatch(setSubCategoryItemsData([]))
        //         // showToast(`No More Data in ${categoryName}`)
        //         // dispatch(setSubCategoryItemsPage(1))
        //     } else {

        //         // showToast(response.message);
        //     }
        // }
    } catch (error) {
        showToast(`${error} Error in GetSubCategoryItemsMethod`);
    }
};



export const GetCategoryMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // console.log('GetCategoryMethod_props', storeId, saasId, data);

    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}category/get-list/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,);
            // console.log('GetCategoryMethod_resp', response);

            if (response?.status) {


                dispatch(setCategoryData(response?.data))
            }
            return response?.data
        } catch (error) {
            // console.error("TestMethod API request error:", error);
            showMessage({
                message: "Error fetching categpry",
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


// Function to get sales report
export const GetgetSalesReportMethod = (startDateprops) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    const { salesReportData, startDate } = getState()?.salesReportReducer;

    // const date = startDateProps ?? startDate;
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
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const { salesReportData, startDate } = getState()?.salesReportReducer

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
    // console.log('GetgetSalesReportMethod_props', charges, charge);

    dispatch(setLoadingState(true));

    try {
        const method = "PUT";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/update-delivery-charges/${store_per_id}/${saasId}/${storeId}/${charge}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            // console.log("UpdateDeliveryChargesMethod_endUrl", endUrl)

            // console.log('GetgetSalesReportMethod_resp', response?.list_sales_report?.length)
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
            // console.error("TestMethod API request error:", error);
            showToast("something error")

        } finally {
            dispatch(setLoadingState(false));
        }
    } catch (error) {
        // console.error("TestMethod unexpected error:", error);
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
            // console.log("UpdateMinOrderValueMethod_endUrl", endUrl)

            if (response?.status === true) {
                // console.log("UpdateMinOrderValueMethod_resp_inside", response);
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

    // console.log("GetMinOrderValueMethod",store_per_id)
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

    // console.log("GetDelivryChargesMethod")
    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}store-master/get-delivery-charges/${store_per_id}/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)

            if (response?.status === true) {
                // console.log("GetMinOrderValueMethod_resp_inside", response?.data?.deliver_charges);
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
    const store_per_id = getState()?.authReducer?.user?.store_per_id

    // console.log("GetCustomerMethod")
    dispatch(setLoadingState(true));

    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}digital-promotion/get-customer-list/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            // console.log('GetCustomerMethod_resp', response?.data)

            if (response?.status == true) {
                // console.log("GetMinOrderValueMethod_resp_inside", response?.data?.deliver_charges);
                dispatch(setCustomerList(response?.data))

                return response?.status
            } else {
                showToast("something error in GetCustomerMethod")

            }

        } catch (error) {
            showToast("something error in GetCustomerMethod")

        } finally {
            dispatch(setLoadingState(false))
            // showToast("something error in GetCustomerMethod")
        }
    } catch (error) {
        showToast("something error in GetCustomerMethod")

        dispatch(setLoadingState(false));
    }

};

export const CreateWalletMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    // console.log("CreateWalletMethod")

    try {
        const method = "POST";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}wallet/create-wallet`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)
            console.log("CreateWalletMethod_response", response)

            if (response?.status == true) {
                showToast("wallet created")


            }
            return response
        } catch (error) {
            showToast("something error in CreateWalletMethod")

        } finally {
            dispatch(setLoadingState(false))
            // showToast("something error in CreateWalletMethod")
        }
    } catch (error) {
        showToast("something error in CreateWalletMethod")

        dispatch(setLoadingState(false));
    }
};

export const UpdateWalletMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    const { balance, walletId } = data
    console.log("UpdateWalletMethod_Data", data,)


    try {
        const method = "PUT";
        const headers = {};
        const body = data;
        const endUrl = `${BASE_URL}wallet/update-wallet-balance/${data?.walletId}/${data?.balance}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("UpdateWalletMethod_response", response, endUrl)

            if (response?.status == true) {
                showToast("wallet balance updated")


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
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    // console.log("GetAllWalletMethod")
    dispatch(setLoadingState(true));


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}wallet/get-all-wallet/${saasId}/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            // console.log("GetAllWalletMethod_Resp", response)
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

export const CreateCoupanMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data
    const store_per_id = getState()?.authReducer?.user?.store_per_id
    // console.log("CreateCoupanMethod")

    try {
        const method = "POST";
        const headers = {};
        const body = JSON.stringify(data);
        const endUrl = `${BASE_URL}coupon/create-coupon`;

        try {
            const response = await ApiRequest(endUrl, method, headers, body)
            console.log("CreateCoupanMethod_response", response)

            if (response?.status == true) {
                showToast("coupan created")


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
    // console.log("GetAllCoupanMethod")
    dispatch(setLoadingState(true));


    try {
        const method = "GET";
        const headers = {};
        const endUrl = `${BASE_URL}coupon/get-all-coupon/${storeId}`;

        try {
            const response = await ApiRequest(endUrl, method, headers,)
            console.log("GetAllCoupanMethod_Resp", response?.data)
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

            // showMessage({
            //   message: response?.message,
            //   type: 'success'
            // })
        }
        else {
            // showMessage({
            //   message: response?.message,
            //   type: "danger",
            // })
        }
        return response;
    } catch (error) {
        showToast("something error")

    }



};



//
export const getOrderItemDetailMethod = (data) => async (dispatch, getState) => {
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data

    // console.log("getOrderItemDetailMethod_data", data, userId, storeId, saasId)

    dispatch(setLoadingState(true));

    try {
        const headers = {};
        const body = data;
        const method = 'GET';
        const endUrl = `${BASE_URL}order/get-order-details-list/${saasId}/${storeId}/${data}`;


        let response = await ApiRequest(endUrl, method, headers, body);
        // console.log("getOrderItemDetailMethod response", response?.data);

        if (response?.status) {

            await dispatch(setDeliveredItems(response?.data?.order_sub_details))
            // showMessage({
            //   message: response?.message,
            //   type: 'success'
            // })
            dispatch(setLoadingState(false));

        }
        else {
            // showMessage({
            //   message: response?.message,
            //   type: "danger",
            // })
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
    const { userId, storeId, saasId } = getState()?.authReducer?.user?.user_data;
    // const { categoryCurrentPage } = getState().categoriesReducer;


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
                // console.log("GetCategoryItemMethod_resp", response?.data?.length);
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


    console.log("updateCategory_data", data, categoryId)

    dispatch(setLoadingState(true));

    try {
        const endUrl = `${BASE_URL}category/update-detil/${categoryId}`;
        const method = "PUT";
        const headers = {};
        const body = JSON.stringify(data);

        try {
            const response = await ApiRequest(endUrl, method, headers, body);
            console.log('updateCategory_rep', response);

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
    // console.log('GetQRItemMethod_props', storeId, saasId, data);

    const method = "GET";
    const headers = {};
    const body = JSON.stringify(data);
    const endUrl = `${BASE_URL}item/view-item-detil/${data}`;

    try {
        const response = await ApiRequest(endUrl, method, headers);
        console.log('GetQRItemMethod_resp', endUrl, response);

        if (response?.status) {
            // console.log("first",response?.status)
        } else {
            showToast('Item not available Please try another bar code');
            // console.log("second",response?.status)

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

