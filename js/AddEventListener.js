//#region Load Dashboard

function click_show_dashboard(){
    document.getElementsByClassName("dasboard-admin__right--head-title-p")[0].innerHTML = "Dashboard"; //change title header
    //set slection option
    document.getElementById("item-dasboard__active-selection").id = "";
    document.getElementsByClassName("item-dasboard")[0].id = "item-dasboard__active-selection";

    //add html of dashboard
    document.getElementsByClassName("dasboard-admin__right")[0].innerHTML = "";
    document.getElementsByClassName("dasboard-admin__right")[0].innerHTML += `
        <div class="dasboard-admin__right--body">
            <div class="statistical">
                <div class="statistical--customer" id="statistical-active" onclick="click_show_info_dashboard_customer()">
                    <div class="statistical--number">
                        <p class="statistical--amount"></p>
                        <p class="statistical--title">Customers</p>
                    </div>
                    <i class="far fa-user statistical--icon"></i>
                </div>
                <div class="statistical--products" onclick="click_show_info_dashboard_product()">
                    <div class="statistical--number">
                        <p class="statistical--amount"></p>
                        <p class="statistical--title">Products</p>
                    </div>
                    <i class="fas fa-box statistical--icon"></i>
                </div>
                <div class="statistical--orders" onclick="click_show_info_dashboard_order()">
                    <div class="statistical--number">
                        <p class="statistical--amount"></p>
                        <p class="statistical--title">Orders</p>
                    </div>
                    <i class="far fa-clipboard statistical--icon"></i>
                </div>
                <div class="statistical--income" onclick="click_show_info_dashboard_income()">
                    <div class="statistical--number">
                        <p class="statistical--amount"></p>
                        <p class="statistical--title">Income</p>
                    </div>
                    <i class="fas fa-database statistical--icon"></i>
                </div>
            </div>
            <div class="info-dashboard"></div>
        </div>`;
    load_statistical(); //load statistical
    click_show_info_dashboard_customer(); //Load info dasboard default
}

function click_show_info_dashboard_customer(){
    document.getElementById("statistical-active").id = "";
    document.getElementsByClassName("statistical--customer")[0].id = "statistical-active";
    document.getElementsByClassName("info-dashboard")[0].style.display = "grid";
    document.getElementsByClassName("info-dashboard")[0].innerHTML = "";
    document.getElementsByClassName("info-dashboard")[0].innerHTML += `
        <div class="info-dashboard--chart">
            <div class="myChart">
                <canvas id="myChart"></canvas>
            </div>
            <p class="chart--title">Statistics of new users</p>
        </div>
        <div class="info-dashboard--option">
            <div class="info-dashboard--option-title">
                <p>New users today</p>
            </div>
            <div class="info-dashboard--option-list-newuser"></div>
        </div>`;
        push_Data_In_Firebase_customer();

}

function click_show_info_dashboard_product(){
    document.getElementById("statistical-active").id = "";
    document.getElementsByClassName("statistical--products")[0].id = "statistical-active";
    document.getElementsByClassName("info-dashboard")[0].style.display = "grid";
    document.getElementsByClassName("info-dashboard")[0].innerHTML = "";
    document.getElementsByClassName("info-dashboard")[0].innerHTML += `
        <div class="info-dashboard--chart">
            <div class="myChart">
                <canvas id="myChart"></canvas>
            </div>
            <p class="chart--title">Statistics of new products</p>
        </div>
        <div class="info-dashboard--option">
            <div class="info-dashboard--option-title">
            <p>List product</p>
            </div>
            <div class="info-dashboard--option-list-newuser"></div>
        </div>`;
        push_Data_In_Firebase_product();
}

function click_show_info_dashboard_order(){
    document.getElementById("statistical-active").id = "";
    document.getElementsByClassName("statistical--orders")[0].id = "statistical-active";
    document.getElementsByClassName("info-dashboard")[0].style.display = "grid";
    document.getElementsByClassName("info-dashboard")[0].innerHTML = "";
    document.getElementsByClassName("info-dashboard")[0].innerHTML += `
        <div class="info-dashboard--chart">
            <div class="myChart">
                <canvas id="myChart"></canvas>
            </div>
            <p class="chart--title">Statistics of new products</p>
        </div>
        <div class="info-dashboard--option">
            <div class="info-dashboard--option-title">
            <p>List new order today</p>
            </div>
            <div class="info-dashboard--option-list-newuser"></div>
        </div>`;
        push_Data_In_Firebase_order();
}

function click_show_info_dashboard_income(){
    document.getElementById("statistical-active").id = "";
    document.getElementsByClassName("statistical--income")[0].id = "statistical-active";
    document.getElementsByClassName("info-dashboard")[0].style.display = "block";

    document.getElementsByClassName("info-dashboard")[0].innerHTML = "";
    document.getElementsByClassName("info-dashboard")[0].innerHTML += `
        <div class="info-dashboard--chart">
            <div class="myChart">
                <canvas id="myChart"></canvas>
            </div>
            <p class="chart--title">Statistics income</p>
        </div>`;
        push_Data_In_Firebase_income();
}

//#endregion

//#region order
function click_show_order(){
    document.getElementsByClassName("dasboard-admin__right--head-title-p")[0].innerHTML = "Order"; //change title header
    
    //set slection option
    document.getElementById("item-dasboard__active-selection").id = "";
    document.getElementsByClassName("item-dasboard")[1].id = "item-dasboard__active-selection";

    //add html of dashboard
    document.getElementsByClassName("dasboard-admin__right")[0].innerHTML = `<div class="dasboard-admin__right--body-order">
    <div class="order-left">
            <div class="order-left--list-title">
                <div class ="order-left--list-title-bg">
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>
            </div>

            <div class="order-left--list-order"></div>
        </div>

        <div class="order-right" >
            
        </div>
    </div>`;
    load_order_in_orderpage();
}

function open_form_confirm_cancel_order(title,id_order){
    document.getElementsByClassName("confirm")[0].innerHTML = ``;
    document.getElementsByClassName("confirm")[0].innerHTML += `
        <div class="confirm-bg">
            <div class="confirm-bg--title">
                <p>`+title+`</p>
            </div>
            <div class="confirm-bg--btn">
                <input type="submit" value="Yes" class="btn-agree" onclick = "click_yes_cancel_order('`+id_order+`')">
                <input type="submit" value="Cancel" class="btn-cancel" onclick = "close_form_confirm()"> 
            </div>
        </div>`;
        document.getElementsByClassName("confirm")[0].style.display = "flex";
}

function click_yes_cancel_order(id_order) {
    // run function
    close_form_confirm();
    click_cancel_order(id_order);

}

function click_cancel_order(id_order){
    db.collection("order").doc(id_order).delete().then(()=>{
        alert("Hủy đơn hàng thành công !!!");
        click_show_order();
    })
}

function click_cancel_changeinfo(){
    document.getElementsByClassName("change-info-customer-inoder")[0].style.display = "none";
}

function open_changeinfo(count,id_order,id_user,fullname,phonenumber,address){
    document.getElementsByClassName("change-info-customer-inoder")[0].innerHTML = "";
    document.getElementsByClassName("change-info-customer-inoder")[0].innerHTML += `
    <div class="change-info-customer-inoder--bg">
        <i class="fas fa-times-circle btn-exit" onclick="click_cancel_changeinfo()"></i>
        <p class="change-info-customer-inoder--title">Change Customer Informat </p>
        <div class="change-info-customer-inoder--item">
            <div class="change-info-customer-inoder--fullname">
                <p class="change-info-customer-inoder--fullname-title">
                    Full Name
                </p>
                <input type="text" value = "`+fullname+`" id="change-info-customer-inoder--fullname-info">
            </div>
            <div class="change-info-customer-inoder--phonenumber">
                <p class="change-info-customer-inoder--phonenumber-title">
                    Phonenumber
                </p>
                <input type="text"  value = "`+phonenumber+`" id = "change-info-customer-inoder--phonenumber-info" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
            </div>
            <div class="change-info-customer-inoder--address">
                <p class="change-info-customer-inoder--address-title">
                    Address
                </p>
                <input type="text" value = "`+address+`" id = "change-info-customer-inoder--address-info">
            </div>
            <div class="btn-save-change">
                <input type="submit" value="Save Change" onclick = "open_form_confirm_save_change_info_customer('Do you want to save this information?',`+count+`,'`+id_order+`','`+id_user+`')">
            </div>
        </div>
    </div>`;
    document.getElementsByClassName("change-info-customer-inoder")[0].style.display = "flex";
}

function click_save_change_info_customer(count,id_order,id_user){
    let fullname = document.getElementById("change-info-customer-inoder--fullname-info").value;
    let phonenumber = document.getElementById("change-info-customer-inoder--phonenumber-info").value;
    let address = document.getElementById("change-info-customer-inoder--address-info").value;
    db.collection("customer").doc(id_user).update({
        fullname : fullname,
        phonenumber : phonenumber,
        address : address
    }).then(()=>{
        alert("Update successful !!!");
    })

    load_information_order(id_order,count);
    click_cancel_changeinfo();
}

function open_form_confirm_save_change_info_customer(title,count,id_order,id_user){
    document.getElementsByClassName("confirm")[0].innerHTML = ``;
    document.getElementsByClassName("confirm")[0].innerHTML += `
        <div class="confirm-bg">
            <div class="confirm-bg--title">
                <p>`+title+`</p>
            </div>
            <div class="confirm-bg--btn">
                <input type="submit" value="Yes" class="btn-agree" onclick = "click_yes_save_change_info_customer(`+count+`,'`+id_order+`','`+id_user+`')">
                <input type="submit" value="Cancel" class="btn-cancel" onclick = "close_form_confirm()"> 
            </div>
        </div>`;
        document.getElementsByClassName("confirm")[0].style.display = "flex";
}

function click_yes_save_change_info_customer(count,id_order,id_user) {
    // run function
    click_save_change_info_customer(count,id_order,id_user);
    close_form_confirm();
}
//#endregion

//#region form confirm
function close_form_confirm() {
    document.getElementsByClassName("confirm")[0].style.display = "none";
}

function open_form_confirm(title){
    document.getElementsByClassName("confirm")[0].innerHTML = ``;
    document.getElementsByClassName("confirm")[0].innerHTML += `
        <div class="confirm-bg">
            <div class="confirm-bg--title">
                <p>`+title+`</p>
            </div>
            <div class="confirm-bg--btn">
                <input type="submit" value="Yes" class="btn-agree" onclick = "click_yes()">
                <input type="submit" value="Cancel" class="btn-cancel" onclick = "close_form_confirm()"> 
            </div>
        </div>`;
        document.getElementsByClassName("confirm")[0].style.display = "flex";
}

function click_yes() {
    // run function
}
//#endregion

//#region render img slide-img
function next_img_slide(dem,class_name,vitri)
{
    let temp = document.getElementsByClassName(class_name)[vitri];
    let a = new Number(temp.style.left.replace("%",""));
    if(a > dem*(-33))
        {
            a -= 33;
        }
    let right_deg = a +"%";
    document.getElementsByClassName(class_name)[vitri].style.left = right_deg;
    var moveAndChangePosition = [
        {
            left : right_deg,
        }
    ]
    temp.animate(moveAndChangePosition,{
        duration : 500,
        fill: 'forwards'
    })
}

function previous_img_slide(nameclass,vitri)
{
    let temp = document.getElementsByClassName(nameclass)[vitri];
    let a = new Number(temp.style.left.replace("%",""));
    if(a < 0)
    {
        a += 33;
    }
    
    let right_deg = a +"%";
    document.getElementsByClassName(nameclass)[vitri].style.left = right_deg;
    var moveAndChangePosition = [
        {
            left : right_deg,
        }
    ]
    temp.animate(moveAndChangePosition,{
        duration : 500,
        fill: 'forwards'
    })
}

//#endregion

//#region product
function click_product() {
    document.getElementsByClassName("dasboard-admin__right--head-title-p")[0].innerHTML = "Product"; //change title header
    
    //set slection option
    document.getElementById("item-dasboard__active-selection").id = "";
    document.getElementsByClassName("item-dasboard")[2].id = "item-dasboard__active-selection";

    document.getElementsByClassName("dasboard-admin__right")[0].innerHTML ='';
    document.getElementsByClassName("dasboard-admin__right")[0].innerHTML += `
    <div class="add-product" onclick ="load_change_info_product(true)">
        <div class="add-product--title" >
            <p>Add Product</p>
        </div>
        <i class="fas fa-plus-circle"></i>
    </div>
    <div class="dasboard-admin__right--body-order">
        <div class="product-left">
            <div class="product-left--title">
                <div class="product-left--list-title">
                    <p>Picture</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Discount</p>
                    <p>Quality</p>
                    <p>Title</p>
                    <p></p>
                </div>
                <div class="product-left--body">
                </div>
            </div>
        </div>
    </div>`;
    load_product();
}

function add_product_on_firebase(event) {
    // checking
    event.preventDefault();
    let name_product = document.getElementsByClassName("product-info-name--text")[0].value;
    let price = document.getElementsByClassName("product-info-price--text")[0].value;
    let discount = document.getElementsByClassName("product-info-discount--text")[0].value;
    let origin = document.getElementsByClassName("product-info-origin--text")[0].value;
    let warranty = document.getElementsByClassName("product-info-warranty-period--text")[0].value +" "+ document.getElementById("type").value;
    let warranty_temp = document.getElementsByClassName("product-info-warranty-period--text")[0].value;
    let gender = document.getElementsByClassName("product-info-gender--text")[0].value;
    let brand = document.getElementsByClassName("product-info-brand--text")[0].value;
    let strap = document.getElementsByClassName("product-info-watch-strap--text")[0].value;
    let glasses = document.getElementsByClassName("product-info-watch-glasses--text")[0].value;
    let diameter = document.getElementsByClassName("product-info-Diameter--text")[0].value +" "+ document.getElementById("Diameter").value; 
    let diameter_temp = document.getElementsByClassName("product-info-Diameter--text")[0].value;
    let engine = document.getElementsByClassName("product-info-Engine--text")[0].value;
    let info = document.getElementsByClassName("product-info-chuan--text")[0].value;
    let quatity = document.getElementsByClassName("product-info-Quality--text")[0].value;


    let price_temp = (Number(price)+ Number(price) * Number(discount)/100);
    var object = {
        Xuat_xu : origin,
        bao_hanh : warranty,
        brand : brand,
        date_submitted : new Date(),
        day : strap,
        discount : Number(discount),
        duong_kinh : diameter,
        gender : gender,
        img_list : [],
        inf : info,
        kinh : glasses,
        may : engine,
        name : name_product,
        price : Number(price_temp),
        so_luong : Number(quatity),
        value : Number(price),
        vote : 3
    }
    if(name_product != "" && price != ""  && discount != ""  && origin != ""  && warranty_temp != ""  && gender != ""  && brand != ""  
    && strap != ""  && glasses != "" && diameter_temp != "" && engine != "" && info != "" && quatity != "" && temp_array_img_posts.length > 0)
    {
        db.collection("products").add(object).then((e)=>{
            db.collection("products").doc(e.id).update({
                id : e.id
            }).then(()=>{
                console.log(e.id);
                alert("Add new product successfull !!!");
            })

            for(let file of temp_array_img_posts)
            {    
                var uploadTask = storage.ref('/product/'+e.id+"/" + file.name+'.png').put(file);
                uploadTask.on('state_changed',(snapshot) => {
                }, 
                (error) => {}, 
                () => {
                            var listRef = storage.ref().child('/product/'+e.id);
                            listRef.listAll().then((res) => {
                                res.items.forEach((itemRef) => {
                                    itemRef.getDownloadURL().then((url)=>{
                                        db.collection("products").doc(e.id).update({
                                            img_list : firebase.firestore.FieldValue.arrayUnion(url),
                                        }).then(()=>{
                                            console.log("Thanh cong");
                                        }).catch((error)=>{
                                            console.log("Thêm bài đăng thất bại !!!");
                                        });
                                    })
                                });
                            }).catch((error) => {
                                console.log("Thêm bài đăng thất bại !!!");
                            });           
                }
                );
            }
            setTimeout(load_product(),2000);
            close_change_info_product();
        }).catch((error)=>{
            console.log(error);
        })
    }
    else{
        alert("Please enter full information !!!");
    }
}

function update_product_on_firebase(event,id_product) {
    // checking
    event.preventDefault();
    let name_product = document.getElementsByClassName("product-info-name--text")[0].value;
    let price = document.getElementsByClassName("product-info-price--text")[0].value;
    let discount = document.getElementsByClassName("product-info-discount--text")[0].value;
    let origin = document.getElementsByClassName("product-info-origin--text")[0].value;
    let warranty = document.getElementsByClassName("product-info-warranty-period--text")[0].value +" "+ document.getElementById("type").value;
    let warranty_temp = document.getElementsByClassName("product-info-warranty-period--text")[0].value;
    let gender = document.getElementsByClassName("product-info-gender--text")[0].value;
    let brand = document.getElementsByClassName("product-info-brand--text")[0].value;
    let strap = document.getElementsByClassName("product-info-watch-strap--text")[0].value;
    let glasses = document.getElementsByClassName("product-info-watch-glasses--text")[0].value;
    let diameter = document.getElementsByClassName("product-info-Diameter--text")[0].value +" "+ document.getElementById("Diameter").value; 
    let diameter_temp = document.getElementsByClassName("product-info-Diameter--text")[0].value;
    let engine = document.getElementsByClassName("product-info-Engine--text")[0].value;
    let info = document.getElementsByClassName("product-info-chuan--text")[0].value;
    let quatity = document.getElementsByClassName("product-info-Quality--text")[0].value;


    let price_temp = (Number(price)+ Number(price) * Number(discount)/100);
    var object = {
        Xuat_xu : origin,
        bao_hanh : warranty,
        brand : brand,
        date_submitted : new Date(),
        day : strap,
        discount : Number(discount),
        duong_kinh : diameter,
        gender : gender,
        img_list : [],
        inf : info,
        kinh : glasses,
        may : engine,
        name : name_product,
        price : Number(price_temp),
        so_luong : Number(quatity),
        value : Number(price),
        vote : 3
    }
    if(name_product != "" && price != ""  && discount != ""  && origin != ""  && warranty_temp != ""  && gender != ""  && brand != ""  
    && strap != ""  && glasses != "" && diameter_temp != "" && engine != "" && info != "" && quatity != "" && (temp_array_img_posts.length + temp_img_data.length) > 0)
    {
        db.collection("products").doc(id_product).update(object).then((e)=>{})
        .then(()=>{
            if(temp_img_data.length > 0)
            {
                db.collection("products").doc(id_product).update({
                    img_list : [],
                });
                for(let link of temp_img_data)
                {
                    db.collection("products").doc(id_product).update({
                        img_list : firebase.firestore.FieldValue.arrayUnion(link)
                    });
                }
            }
            if(temp_array_img_posts.length > 0)
                {
                    let dem = 0;
                    for(let file of temp_array_img_posts)
                    {    
                        var uploadTask = storage.ref('/product/'+id_product+"/" + file.name+'.png').put(file);
                        dem++;
                        uploadTask.on('state_changed',(snapshot) => {
                        }, 
                        (error) => {}, 
                        () => {
                            var listRef = storage.ref().child('/product/'+id_product);
                            listRef.listAll().then((res) => {
                                res.items.forEach((itemRef) => {
                                    itemRef.getDownloadURL().then((url)=>{
                                        db.collection("products").doc(id_product).update({
                                            img_list : firebase.firestore.FieldValue.arrayUnion(url),
                                        }).then(()=>{
                                            console.log("Thanh cong");
                                        }).catch((error)=>{
                                            console.log(error.message);
                                        });
                                    })
                                });
                            }).catch((error) => {
                                flag = false;
                                if(flag == false)
                                {
                                    console.log(error);
                                }
                            });
                        }
                        );
                    }
                }
                close_change_info_product();
                setTimeout(load_product(),1000);
                alert("Add new product successfull !!!");
                
            });
    }else
    {
    alert("Please enter full information !!!");
    }
}

function close_form_confirm_delete_product() {
    document.getElementsByClassName("confirm")[0].style.display = "none";
}

function open_form_confirm_delete_product(event,title,id_product){
    event.preventDefault();
    document.getElementsByClassName("confirm")[0].innerHTML = ``;
    document.getElementsByClassName("confirm")[0].innerHTML += `
        <div class="confirm-bg">
            <div class="confirm-bg--title">
                <p>`+title+`</p>
            </div>
            <div class="confirm-bg--btn">
                <input type="submit" value="Yes" class="btn-agree" onclick = "click_yes_delete_product('`+id_product+`')">
                <input type="submit" value="Cancel" class="btn-cancel" onclick = "close_form_confirm_delete_product()"> 
            </div>
        </div>`;
        document.getElementsByClassName("confirm")[0].style.display = "flex";
}

function click_yes_delete_product(id_product) {
    // run function
    delete_product_on_firebase(id_product);
}

function delete_product_on_firebase(id_product){
    db.collection("products").doc(id_product).delete().then(()=>{
        alert("Delete product successfully !!!");
        close_form_confirm_delete_product()
        close_change_info_product();
        load_product();
    })

}
//#endregion