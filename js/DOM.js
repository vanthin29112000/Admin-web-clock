function change_value_toString(price,com){
    let temp_string = "";
    temp_string += price;
    let change_tostring = "";
    let dem = 1 ;
    for(let i = temp_string.length-(1+com) ; i >= 0;i--)
    {
        if(dem == 3)
        {
           change_tostring+= temp_string[i];
            if(i !=0)
            {
                change_tostring+= ".";
            }
            dem = 1;
        }else{
            change_tostring+= temp_string[i];
            dem ++;
        }
    }
    return change_tostring.split("").reverse().join("") ;
}

function load_statistical(){
    let count_customer = 0;
    let count_products = 0;
    let count_order = 0;
    let count_icome = 0;
    db.collection("customer").get().then((user)=>{
        user.forEach(element => {
            count_customer++;
        });
        document.getElementsByClassName("statistical--amount")[0].innerHTML = count_customer;
    });

    db.collection("products").get().then((product)=>{
        product.forEach(element => {
            count_products++;
        });
        document.getElementsByClassName("statistical--amount")[1].innerHTML = count_products;
    })

    db.collection("order").get().then((user)=>{
        user.forEach(element => {
            count_order++;
        });
        document.getElementsByClassName("statistical--amount")[2].innerHTML = count_order;
    })

    db.collection("order").get().then((order)=>{
        order.forEach(element => {
            element.data().list_product_incart.forEach((product)=>{
                count_icome += product.value * product.so_luong;
            })
        });
        
        document.getElementsByClassName("statistical--amount")[3].innerHTML ="$ "+ change_value_toString(count_icome,3) + "k";
    })
}

function load_account_new(list_data,list_id){
    let flag = true;
    document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML = "";
    for(let i = 0 ; i< list_id.length;i++)
    {
        let second = new Date(list_data[i].date_submitted.seconds * 1000);
        let date_now = new Date();

        if(second.getDate()== date_now.getDate() && second.getMonth()== date_now.getMonth() &&second.getFullYear()== date_now.getFullYear())
        {
            document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML += `
            <div class="user-of-list-newuser">
                <div class="user-info">
                    <i class="far fa-user-circle"></i>
                    <div class="user-of-list-newuser--info">
                        <p class="user-of-list-newuser--info-username">`+list_data[i].fullname+`</p>
                        <p class="user-of-list-newuser--info-id">#`+list_id[i]+`</p>
                    </div>
                </div>
                <div class="user-of-list-newuser--option">
                    <i class="far fa-user-circle"></i>
                    <i class="far fa-envelope"></i>
                    <i class="fas fa-phone-alt"></i>
                </div>
            </div>`;
            flag = false;
        }
    }
    if(flag == true){
        document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML = '<p class="noti-result-new-customer">No new customers today</p>';
    }
}

function Load_product_indashboard(list_data,list_id){
    document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML = "";
    for(let i = 0;i< list_data.length;i++){
        let count = 0;
        db.collection("order").get().then((data)=>{
            data.forEach((order)=>{
                order.data().list_product_incart.forEach((product)=>{
                    if(product.id == list_id[i])
                    {
                        count+= product.so_luong;
                    }
                })
            })
            document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML += `
                <div class="user-of-list-newuser">
                    <div class="user-info">
                        <img src="`+list_data[i].img_list[0]+`" alt="">
                        <div class="user-of-list-newuser--info">
                            <p class="user-of-list-newuser--info-username">`+list_data[i].name+`</p>
                            <p class="user-of-list-newuser--info-id">#`+list_id[i]+`</p>
                        </div>
                    </div>
                    <div class="user-of-list-newuser--option">
                        <div class="sold-product">
                            <p class="sold-product--title">sold</p>
                            <p class="sold-product--amount">`+count+`</p>
                        </div>
                        <div class="inventory-product">
                            <p class="sold-product--title">Inventory</p>
                            <p class="sold-product--amount">`+list_data[i].so_luong+`</p>
                        </div>
                    </div>
                </div>`;
        })
    }
}

function load_order_new(list_data,list_id){
    let flag = true;
    document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML = "";
    for(let i = 0 ; i< list_id.length;i++)
    {
        let second = new Date(list_data[i].date_submitted.seconds * 1000);
        let date_now = new Date();

        if(second.getDate()== date_now.getDate() && second.getMonth()== date_now.getMonth() &&second.getFullYear()== date_now.getFullYear())
        {
            let sum = 0;
            list_data[i].list_product_incart.forEach((product)=>{
                sum += product.so_luong * product.value;
            })
            db.collection("customer").doc(list_data[i].id_user).get().then((user)=>{
                document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML += `
                <div class="user-of-list-newuser">
                    <div class="user-info">
                        <i class="far fa-user-circle"></i>
                        <div class="user-of-list-newuser--info">
                            <p class="user-of-list-newuser--info-username">`+user.data().fullname+`</p>
                            <p class="user-of-list-newuser--info-id">Id order: #`+list_id[i]+`</p>
                        </div>
                    </div>
                    <div class="user-of-list-newuser--option">`+change_value_toString(sum,0)+` đ</div>
                </div>`;
            })  
            flag = false;
        }
    }
    if(flag == true){
        document.getElementsByClassName("info-dashboard--option-list-newuser")[0].innerHTML = '<p class="noti-result-new-customer">No new order today</p>';
    }
}

//#region order

function load_product_in_order(list_product,count){
    list_product.forEach((product)=>{
        db.collection("products").doc(product.id).get().then((data)=>{
            console.log(data.data());
            document.getElementsByClassName("item-order--list-product")[count].innerHTML += `
                <div class="item-order--product">
                    <div class="item-order--product-name">
                        <img src="`+data.data().img_list[0]+`" alt="">
                        <div class="item-product">
                            <p class="item-product--name">`+data.data().name+`</p>
                            <p class="item-product--id">ID: `+product.id+`</p>
                        </div>
                    </div>
                    <p class="item-order--product-price">`+change_value_toString(product.value,0)+`đ</p>
                    <input type="text" disabled value="`+product.so_luong+`" class="item-order--product-quatity">
                    <p class="item-order--product-price">`+change_value_toString(product.so_luong*product.value,0)+`đ</p>
                    
                </div>`;
        })
    })
    
}

function buble_sort(temp_list)
{
    let list_render_product =[];
    temp_list.forEach((order)=>{
        list_render_product.push(order);
    })
    console.log(list_render_product);
    for (let i = 0; i < list_render_product.length - 1; i++)
    {
        for (let j = 0; j < list_render_product.length - i - 1; j++)
        {
            if (list_render_product[j].date_submitted.seconds < list_render_product[j+1].date_submitted.seconds) 
            {
                // swap arr[j+1] và arr[i]
                console.log("chuyen ");
                let temp = list_render_product[j];
                list_render_product[j] = list_render_product[j + 1];
                list_render_product[j + 1] = temp;
            }
        }
    }
    return list_render_product;
}

function load_order_in_orderpage(){

    document.getElementsByClassName("order-left--list-order")[0].innerHTML = "";
    let temp_array = [];
    let temp_id = [];
    db.collection("order").get().then((data)=>{
        let count = 0; 
        data.forEach((order)=>{
            temp_array.push(order.data());
            temp_id.push(order.id);
        })
        temp_array = buble_sort(temp_array);
        temp_array.forEach((order)=>{
            document.getElementsByClassName("order-left--list-order")[0].innerHTML +=`
            <div class="item-order">
                <div class="item-order--title">
                    <div class="item-order--title-left">
                        <p class="item-order--title-id">ID Order: </p>
                        <p> #`+temp_id[count]+`</p>
                    </div>
                    <div class="item-order--title-right">
                        <i class="fas fa-cog item-order--title-right-icon" onclick = "load_information_order('`+temp_id[count]+`',`+count+`)" ></i>
                        <i class="fas fa-chevron-circle-right" style = "display : none;"></i>
                    </div>
                </div>
                <div class="item-order--list-product">
                    <!-- product -->
                    
                </div>
            </div>`;

            load_product_in_order(order.list_product_incart,count);
            count++;
        })
            
        
    })
}

var count_temp = -1;
var id_temp;

function load_information_order(id_order,count){
    document.getElementsByClassName("item-order--title-right")[count].innerHTML = `
        <i class="fas fa-cog item-order--title-right-icon" onclick = "cancel_information_order('`+id_order+`',`+count+`)" ></i>
            <i class="fas fa-chevron-circle-right" style = "display : block;"></i>`;

    document.getElementsByClassName("dasboard-admin__right--body-order")[0].style.display = "grid";
    document.getElementsByClassName("item-order--title-right-icon")[count].id = "item-order--title-right--i-active";
    document.getElementsByClassName("order-right")[0].style.display = "block";

    if(count_temp != -1 && count_temp != count){
        document.getElementsByClassName("item-order--title-right")[count_temp].innerHTML = `
        <i class="fas fa-cog item-order--title-right-icon" onclick = "load_information_order('`+id_temp+`',`+count_temp+`)" ></i>
            <i class="fas fa-chevron-circle-right" style = "display : none;"></i>`;
    }

    id_temp = id_order;
    count_temp = count;

    db.collection("order").doc(id_order).get().then((order)=>{
        let sum = 0;
        order.data().list_product_incart.forEach((product)=>{
            sum+= product.value * product.so_luong;
        })
        db.collection("customer").doc(order.data().id_user).get().then((user)=>{
            document.getElementsByClassName("order-right")[0].innerHTML = `
            <div class="order-right-title">Information Order</div>
            <p class="order-right-id">#`+id_order+`</p>
            <div class="infor-order">
                <div class="infor-order--title">
                    <p>Information Cutomer</p>
                </div>
                <div class="infor-order--fullname">
                    <p class="infor-order--fullname-title">Fullname: </p>
                    <p class="infor-order--fullname-info">`+user.data().fullname+`</p>
                </div>
                <div class="infor-order--phone">
                    <p class="infor-order--phone-title">Phonenumber: </p>
                    <p class="infor-order--fullname-info">`+user.data().phonenumber+`</p>
                </div>
                <div class="infor-order--gmail">
                    <p class="infor-order--gmail-title">Fullname: </p>
                    <p class="infor-order--gmail-info">`+user.data().email+`</p>
                </div>
                <div class="infor-order--address">
                    <p class="infor-order--address-title">Address: </p>
                    <p class="infor-order--fullname-info">`+user.data().address+`</p>
                </div>
            </div>

            <div class="info-product-incart">
                <div class="infor-order--title">
                    <p>Information incart</p>
                </div>
                <div class="infor-incart--subtotal">
                    <p class="infor-incart--subtotal-title">Subtotal : </p>
                    <p class="infor-incart--subtotal-info">`+change_value_toString(sum,0)+` đ</p>
                </div>
                <div class="infor-incart--discount">
                    <p class="infor-incart--discount-title">Discount : </p>
                    <p class="infor-incart--subtotal-info">0 đ</p>
                </div>
                <div class="infor-incart--total">
                    <p class="infor-incart--total-title">Total : </p>
                    <p class="infor-incart--total-info">`+change_value_toString(sum,0)+` đ</p>
                </div>
            </div>

            <div class="change-order-incart">
                <input type="submit" value="Cancel Order" class="btn-cancel-order" onclick = "open_form_confirm_cancel_order('Do you want to delete this order ?','`+id_order+`')">
                <input type="submit" value="Order Editing" class="btn-change-info" onclick = "open_changeinfo(`+count+`,'`+id_order+`','`+order.data().id_user+`','`+user.data().fullname+`', '`+user.data().phonenumber+`','`+user.data().address+`')">
                
            </div>`;
        })
    })
}

function cancel_information_order(id_order,count){
    document.getElementsByClassName("item-order--title-right")[count].innerHTML = `
    <i class="fas fa-cog item-order--title-right-icon" onclick = "load_information_order('`+id_order+`',`+count+`)" ></i>
    <i class="fas fa-chevron-circle-right" style = "display : none;"></i>`;

    document.getElementsByClassName("order-right")[0].style.display = "none";
    document.getElementsByClassName("dasboard-admin__right--body-order")[0].style.display = "block";
    document.getElementsByClassName("item-order--title-right-icon")[count].id = "";
    
}
//#endregion

//#region product
function load_product() {
    document.getElementsByClassName("product-left--body")[0].innerHTML = ``;
    db.collection("products").get().then((data)=>{
        let count = 0;
        data.forEach((product)=>{
            document.getElementsByClassName("product-left--body")[0].innerHTML += `
            <div class="product-left--item-bg">
                <div class="product-left--item">
                    <div class="product-left--item-img">
                        
                    </div>
                    <div class="product-left--item-name">
                        <p>`+product.data().name+`</p>
                    </div>
                    
                    <div class="product-left--item-price">
                        <p>`+change_value_toString(product.data().value,0)+`đ</p>
                    </div>
                    <div class="product-left--item-discount">
                        <p>`+product.data().discount+`%</p>
                    </div>
                    <div class="product-left--item-quality">
                        <input type="text" value="`+product.data().so_luong+`" disabled>
                    </div>
                    
                    <div class="product-left--item-title">
                        <p>`+product.data().inf+`</p>
                    </div>
                    <div class="product-left--item-btn">
                        <i class="fas fa-cog" onclick = "load_change_info_product(false,'`+product.id+`')"></i>
                    </div>
                </div>
            </div>`;

            if(product.data().img_list.length >3){
                document.getElementsByClassName("product-left--item-img")[count].innerHTML += `
                <div  class="product-left--item-img-previous" onclick="previous_img_slide('product-left--item-list-img',`+count+`)" >
                    <i class="fas fa-chevron-right"></i>
                </div> `;
            }

            document.getElementsByClassName("product-left--item-img")[count].innerHTML += `
            <div class="product-left--item-list-img"></div>`;

            product.data().img_list.forEach((img)=>{
                document.getElementsByClassName("product-left--item-list-img")[count].innerHTML += `
                <img src="`+img+`" alt="">`;
            })
            if(product.data().img_list.length >3){
                document.getElementsByClassName("product-left--item-img")[count].innerHTML += `
                <div class="product-left--item-img-next" onclick="next_img_slide(`+(product.data().img_list.length-3)+`,'product-left--item-list-img',`+count+`)">
                    <i class="fas fa-chevron-right"></i>
                </div>`;
            }
            count++;
        })
    })
}

function load_change_info_product(flag,id_product) {
    document.getElementsByClassName("change-info-product")[0].style.display = "flex";
    document.getElementsByClassName("change-info-product")[0].innerHTML = "";
    document.getElementsByClassName("change-info-product")[0].innerHTML +=`
    <form class="change-info-product--bg">
        <i class="fas fa-times-circle btn-exit" onclick="close_change_info_product()"></i>
        <p class="change-info-product--title">Product Information</p>
        <div class="change-info-product--info">
            <div class="change-info-product--info-left">
                <div class="change-info-product--info-left-title">
                    <p>Basic Infomation</p>
                </div>
                <div class="change-info-product--info-left-infoproduct">
                    <div class="product-info-name">
                        <p class="product-info-name--title">
                            Name Product
                        </p>
                        <input type="text" class="product-info-name--text" required>
                    </div>
                    <div class="product-info-price">
                        <p class="product-info-price--title">
                            Price (VND)
                        </p>
                        <input type="text" class="product-info-price--text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
                    </div>
                    <div class="product-info-discount">
                        <p class="product-info-discount--title">
                            Discount (%)
                        </p>
                        <input type="text" class="product-info-discount--text" maxlength="2" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
                    </div>
                    <div class="product-info-origin">
                        <p class="product-info-origin--title">
                            Origin (International)
                        </p>
                        <input type="text" class="product-info-origin--text" required>
                    </div>
                    <div class="product-info-warranty-period">
                        <p class="product-info-warranty-period--title">
                            Warranty Period
                        </p>
                        <input type="text" class="product-info-warranty-period--text" maxlength="2" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
                        <select name="type" id="type">
                            <option value="Năm">Year</option>
                            <option value="Tháng">Month</option>
                            <option value="Ngày">Day</option>
                        </select>
                    </div>
                    <div class="product-info-Quality">
                        <p class="product-info-Quality--title">
                            Number
                        </p>
                        <input type="text" class="product-info-Quality--text" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
                    </div>

                    <div class="product-info-image">
                        <p class="product-info-image--title">
                            Image
                        </p>
                        <div class="product-info-image--list-img">
                                
                        <div class="item-list-img">
                            <div class="item-list-img-info"></div>
                        </div>
                        
                        <label class="product-info-image--text">
                            <input type="file" multiple onchange="changeHandler(event,0)">
                            <i class="fas fa-plus"></i>
                        </label>
                    </div>
                    </div>
                </div>
            </div>
            <div class="change-info-product--info-right">
                <div class="change-info-product--info-right-title">
                    <p>Product Structure</p>
                </div>
                <div class="change-info-product--info-right-infoproduct">
                    <div class="product-info-gender">
                        <p class="product-info-gender--title">
                            Gender
                        </p>
                        <select name="gender" id="gender" class="product-info-gender--text" onchange = "load_brand()">
                            <option value=""></option>
                            <option value="nam">Male</option>
                            <option value="nu">Female</option>
                        </select>
                    </div>

                    <div class="product-info-brand">
                        <p class="product-info-brand--title">
                            Brand
                        </p>
                        <select name="brand" id="brand" class="product-info-brand--text">
                            
                        </select>
                    </div>

                    <div class="product-info-watch-strap">
                        <p class="product-info-watch-strap--title">
                            Watch Strap
                        </p>
                        <select name="watch-strap" id="watch-strap" class="product-info-watch-strap--text">
                            <option value="Thép không gỉ">Thép không gỉ</option>
                            <option value="Da">Da</option>
                        </select>
                    </div>

                    <div class="product-info-watch-glasses">
                        <p class="product-info-watch-glasses--title">
                            Watch Glasses
                        </p>
                        <select name="watch-glasses" id="watch-glasses" class="product-info-watch-glasses--text">
                            <option value="Cứng">Cứng</option>
                            <option value="Sapphire">Sapphire</option>
                        </select>
                    </div>

                    <div class="product-info-Diameter">
                        <p class="product-info-Diameter--title">
                            Diameter of watch face
                        </p>
                        <input type="text" class="product-info-Diameter--text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
                        <select name="Diameter" id="Diameter">
                            <option value="mm">mm</option>
                            <option value="cm">cm</option>
                        </select>
                    </div>

                    <div class="product-info-Engine">
                        <p class="product-info-Engine--title">
                            Engine
                        </p>
                        <select name="Engine" id="Engine" class="product-info-Engine--text">
                            <option value="Quartz">Quartz</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>

                    <div class="product-info-chuan">
                        <p class="product-info-chuan--title">
                            More Infomation
                        </p>
                        <textarea name="text"cols="30" rows="10" class="product-info-chuan--text"></textarea>
                    </div>

                    
                </div>
            </div>
        </div>
        <div class="product-info-btn">
            
        </div>
    </form>`;   

    if(flag == false){
        document.getElementsByClassName("product-info-btn")[0].innerHTML += 
        `<input type="submit" value="Delete Product" class="btn-delete-product" onclick ="open_form_confirm_delete_product(event,'Do you really want to delete this product?','`+id_product+`')">
        <input type="submit" value="Update Product" class="btn-add-new-product" onclick ="update_product_on_firebase(event,'`+id_product+`')">`;
        load_information_product_in_admin(id_product);
    }
    else{
        document.getElementsByClassName("product-info-btn")[0].innerHTML = `<input type="submit" value="Add New Product" class="btn-add-new-product" onclick ="add_product_on_firebase(event)">`;
    }
    load_cl();
    load_cl_mat_kinh();
    load_machine();
}

function load_information_product_in_admin(id_product) {
    db.collection('products').doc(id_product).get().then((product)=>{
        document.getElementsByClassName("product-info-name--text")[0].value = product.data().name;
        document.getElementsByClassName("product-info-price--text")[0].value= product.data().value;
        document.getElementsByClassName("product-info-discount--text")[0].value= product.data().discount;
        document.getElementsByClassName("product-info-origin--text")[0].value = product.data().Xuat_xu;
        let baohanh = product.data().bao_hanh.split(" ");
        console.log(baohanh);
        document.getElementsByClassName("product-info-warranty-period--text")[0].value = baohanh[0];
        document.getElementById("type").value = baohanh[1];
        document.getElementsByClassName("product-info-gender--text")[0].value = product.data().gender;
        load_brand();
        document.getElementsByClassName("product-info-brand--text")[0].value = product.data().brand;
        document.getElementsByClassName("product-info-watch-strap--text")[0].value = product.data().day;
        document.getElementsByClassName("product-info-watch-glasses--text")[0].value = product.data().kinh;
        let duongkinh= product.data().duong_kinh.split(" ");
        console.log(duongkinh);
        document.getElementsByClassName("product-info-Diameter--text")[0].value = duongkinh[0];
        document.getElementById("Diameter").value = duongkinh[1];
        document.getElementsByClassName("product-info-Engine--text")[0].value = product.data().may;
        document.getElementsByClassName("product-info-chuan--text")[0].value = product.data().inf;
        document.getElementsByClassName("product-info-Quality--text")[0].value = product.data().so_luong;
        temp_img_data = [];
        temp_img_data = product.data().img_list;
        render_img_show_posts_all();
    })
}

function close_change_info_product() {
    document.getElementsByClassName("change-info-product")[0].style.display = "none";
}
//#endregion

//#region list_img
function render_img_show_posts_all()
{
    document.getElementsByClassName("item-list-img")[0].innerHTML = "";

    if(temp_array_img_posts.length + temp_img_data.length > 3)
    {
        document.getElementsByClassName("item-list-img")[0].innerHTML += `
        <div  class="product-info-image--list-img-previous" onclick="previous_img_slide('item-list-img-info',0)" >
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="item-list-img-info"></div>
        <div  class="product-info-image--list-img-next" onclick="next_img_slide(`+(temp_array_img_posts.length+temp_img_data.length-3)+`,'item-list-img-info',0)" >
            <i class="fas fa-chevron-right"></i>
        </div>`;
    }else{
        document.getElementsByClassName("item-list-img")[0].innerHTML += `
        <div class="item-list-img-info"></div>`;
    }

    render_img_data();
    render_img_show_posts(0);
}
//#region local_posts
var temp_array_img_posts = [];

function delete_file(vitri){
    console.log("truoc",temp_array_img_posts);
    temp_array_img_posts.splice(vitri,1);
    console.log("sau",temp_array_img_posts);
    render_img_show_posts_all();
}

function render_img_show_posts(dem)
{
    console.log("render",temp_array_img_posts);
    for(let i = 0 ; i< temp_array_img_posts.length ;i++)
    {
        let url = URL.createObjectURL(temp_array_img_posts[i]);

        document.getElementsByClassName("item-list-img-info")[dem].innerHTML += `
        <div class="item-img">
            <img src="`+url+`" alt="">
            <div class="option--item-img"  onclick = "delete_file(`+i+`)">
                <p>Delete</p>
            </div>
        </div>`;
    }
}

function changeHandler(evt,dem) { //test
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.target.files;
    document.getElementsByClassName("item-list-img-info")[0].innerHTML = "";
    for(let i=0 ;i<files.length;i++)
    {
        temp_array_img_posts.push(files[i]);
    }
    console.log("add ",temp_array_img_posts);
    render_img_show_posts_all();
}
//#endregion

//#region data_img
var temp_img_data = [];

function add_img_delete_data(url)
{
    temp_img_delete_data.push(url);
}

function render_img_data(){
    let dem = 0;
    for(let img of temp_img_data){
        document.getElementsByClassName("item-list-img-info")[0].innerHTML += `
        <div class="item-img">
            <img src="`+img+`" alt="">
            <div class="option--item-img"  onclick = "delete_img_data(`+dem+`)">
                <p>Delete</p>
            </div>
        </div>`;
        dem++;
    }
}

function delete_img_data(vitri)
{
    temp_img_data.splice(vitri,1);
    render_img_show_posts_all();
}
//#endregion

let floags = [
    {
        id : "brand",
        name : "THƯƠNG HIỆU",
        floag : true,
        value : "",
        show : "",
        scroll : "scroll_x_y",
        array : [
            {
                id : "casio",
                name_brand : "Casio",
                gender : "nam" //test
            },
            {
                id : "citizen",
                name_brand : "Citizen",
                gender : "nam"
            }
            ,
            {
                id : "OP",
                name_brand : "Olym Pianus (Olympia Star)",
                gender : "nam"
            }
            ,{
                id : "doxa",
                name_brand : "Doxa",
                gender : "nam"
            }
            ,{
                id : "tissot",
                name_brand : "Tissot",
                gender : "nam"
            }
            ,{
                id : "logines",
                name_brand : "Logines",
                gender : "nam"
            }
            ,
            {
                id : "saga_nu",
                name_brand : "Saga",
                gender : "nu"
            },
            {
                id : "casio_nu",
                name_brand : "Casio",
                gender : "nu"
            },
            {
                id : "fouettle_nu",
                name_brand : "Fouettlé",
                gender : "nu"
            },
            {
                id : "citizen_nu",
                name_brand : "Citizen",
                gender : "nu"
            },
            {
                id : "doxa_nu",
                name_brand : "Doxa",
                gender : "nu"
            }
    ]
    }
    ,{
        id : "value",
        name : "LỌC THEO GIÁ",
        floag : true,
        value : "",
        show : "",
        scroll : "scroll_x_y",
        array : [
            {
                id : "value_1",
                from : 0,
                to : 2000000
            },
            {
                id : "value_2",
                from : 2000000,
                to : 4000000
            },
            {
                id : "value_3",
                from : 4000000,
                to : 6000000
            },
            {
                id : "value_4",
                from : 6000000,
                to : 8000000
            },
            {
                id : "value_5",
                from : 8000000,
                to : 10000000
            },
            {
                id : "value_6",
                from : 10000000,
                to : 20000000
            },
            {
                id : "value_7",
                from : 20000000,
                to : 30000000
            },
            {
                id : "value_8",
                from : 30000000,
                to : 40000000
            }
        ]
    },
    {
        id : "cl",
        name : "CHẤT LIỆU DÂY",
        floag : true,
        value : "",
        show : "",
        scroll : "scroll_x_y",
        array : [
            {
                name : "Da",
                id : "cl_1"
            },
            {
                name : "Thép Không Gỉ",
                id : "cl_2"
            }
            ,
            {
                name : "Lưới",
                id : "cl_3"
            }
            ,
            {
                name : "Vải",
                id : "cl_4"
            },
            {
                name : "Da Cá Sấu",
                id : "cl_5"
            },
            {
                name : "Nhựa",
                id : "cl_6"
            },
            {
                name : "Cao Su",
                id : "cl_7"
            }
        ]
    },
    {
        id : "cl_Mat_Kinh",
        name : "CHẤT LIỆU MẶT KÍNH",
        floag : true,
        value : "",
        show : "",
        scroll : "",
        array : [
            {
                name : "Cứng",
                id : "cl_Mat_Kinh_1"
            }
            ,
            {
                name : "Sapphire",
                id : "cl_Mat_Kinh_2"
            },
            {
                name : "Nhựa",
                id : "cl_Mat_Kinh_3"
            }
        ]
    }
    ,{
        id : "machine",
        name : "BỘ MÁY & NĂNG LƯỢNG",
        floag : true,
        value : "",
        show : "",
        scroll : "",
        array : [
            {
                name : "Quartz",
                id : "machine_1"
            }
            ,
            {
                name : "Automatic",
                id : "machine_2"
            },
            {
                name : "Năng Lượng Ánh Sáng",
                id : "machine_3"
            },
            {
                name : "Vừa Pin - Vừa Tự Động",
                id : "machine_4"
            }
        ]
    }
];
function load_brand() {
    let type = document.getElementsByClassName("product-info-gender--text")[0].value;
    document.getElementsByClassName("product-info-brand--text")[0].innerHTML = "";
    floags[0].array.forEach((brand)=>{
        console.log(brand);
        if(brand.gender == type){
            document.getElementsByClassName("product-info-brand--text")[0].innerHTML += `
            <option value="`+brand.name_brand+`">`+brand.name_brand+`</option>`;
        }
    }) 
}

function load_cl() {
    document.getElementsByClassName("product-info-watch-strap--text")[0].innerHTML = `<option value=""></option>`;
    floags[2].array.forEach((cl)=>{
            document.getElementsByClassName("product-info-watch-strap--text")[0].innerHTML += `
            <option value="`+cl.name+`">`+cl.name+`</option>`;
    }) 
}

function load_cl_mat_kinh() {
    document.getElementsByClassName("product-info-watch-glasses--text")[0].innerHTML = `<option value=""></option>`;
    floags[3].array.forEach((cl)=>{
            document.getElementsByClassName("product-info-watch-glasses--text")[0].innerHTML += `
            <option value="`+cl.name+`">`+cl.name+`</option>`;
    })
}

function load_machine() {
    document.getElementsByClassName("product-info-Engine--text")[0].innerHTML = `<option value=""></option>`;
    floags[4].array.forEach((cl)=>{
            document.getElementsByClassName("product-info-Engine--text")[0].innerHTML += `
            <option value="`+cl.name+`">`+cl.name+`</option>`;
    })
}



//#endregion