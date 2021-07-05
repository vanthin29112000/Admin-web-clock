function buble_Sort(inputArr){

  let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j < len; j++) {
            if (inputArr[i].month > inputArr[j].month) {
                let tmp = inputArr[i];
                inputArr[i] = inputArr[j];
                inputArr[j] = tmp;
            }
        }
    }
    return inputArr;
}

function show_data(temp){
  let temp_data = [];
    temp.forEach((item)=>{
      var date = new Date(item.date_submitted.seconds*1000);
      let month ;
      switch(date.getMonth()){
        case 0 : {
          month = "January";
          break;
        }
        case 1 : {
          month = "February";
          break;
        }
        case 2 : {
          month = "March";
          break;
        }
        case 3 : {
          month = "April";
          break;
        }
        case 4 : {
          month = "May";
          break;
        }
        case 5 : {
          month = "June";
          break;
        }
        case 6 : {
          month = "July";
          break;
        }
        case 7 : {
          month = "August";
          break;
        }
        case 8 : {
          month = "September";
          break;
        }
        case 9 : {
          month = "October";
          break;
        }
        case 10 : {
          month = "November";
          break;
        }
        case 11 : {
          month = "December";
          break;
        }
      }

      let flag = true;
      temp_data.forEach((date_month)=>{
        if(date_month.month == date.getMonth()){
          date_month.amount ++;
          flag = false;
        }
      })

      if(flag == true)
      {
        let temp_date = {
          month : Number(date.getMonth()),
          month_string : month,
          amount : 1
        }
        temp_data.push(temp_date);
      }
      
    })
    return buble_Sort(temp_data); //sort month
}

function show_data_income(temp){
  let temp_data = [];
    temp.forEach((item)=>{
      var date = new Date(item.date_submitted.seconds*1000);
      let month ;
      switch(date.getMonth()){
        case 0 : {
          month = "January";
          break;
        }
        case 1 : {
          month = "February";
          break;
        }
        case 2 : {
          month = "March";
          break;
        }
        case 3 : {
          month = "April";
          break;
        }
        case 4 : {
          month = "May";
          break;
        }
        case 5 : {
          month = "June";
          break;
        }
        case 6 : {
          month = "July";
          break;
        }
        case 7 : {
          month = "August";
          break;
        }
        case 8 : {
          month = "September";
          break;
        }
        case 9 : {
          month = "October";
          break;
        }
        case 10 : {
          month = "November";
          break;
        }
        case 11 : {
          month = "December";
          break;
        }
      }

      let flag = true;
      temp_data.forEach((date_month)=>{
        if(date_month.month == date.getMonth()){
          item.list_product_incart.forEach((product)=>{
            date_month.amount += product.so_luong * product.value;
          })
          flag = false;
        }
      })

      if(flag == true)
      {
        let sum = 0;
        item.list_product_incart.forEach((product)=>{
          sum += product.so_luong * product.value;
        })
        let temp_date = {
          month : Number(date.getMonth()),
          month_string : month,
          amount : sum
        }
        temp_data.push(temp_date);
      }
      
    })
    return buble_Sort(temp_data); //sort month
}

function push_Data_In_Firebase_customer(){
  let temp = [];
  db.collection("customer").get().then((data)=>{
    var temp_list_id = [];
    data.forEach((user)=>{
      temp.push(user.data());
      temp_list_id.push(user.id);
    })
    
    let temp_data = show_data(temp)
    load_account_new(temp,temp_list_id);
    let parsing = {
      xAxisKey: 'month_string',
      yAxisKey: 'amount'
      };

    fetch_Chart_Api(temp_data,'New customers',parsing); //show chart_customer
  })
}

function push_Data_In_Firebase_product(){
  let temp = [];
  db.collection("products").get().then((data)=>{
    var temp_list_id = [];
    data.forEach((product)=>{
      temp.push(product.data());
      temp_list_id.push(product.id);
    })
    
    let temp_data = show_data(temp)
    Load_product_indashboard(temp,temp_list_id);
    let parsing = {
      xAxisKey: 'month_string',
      yAxisKey: 'amount'
      };

    fetch_Chart_Api(temp_data,'Amount products',parsing); //show chart_product
  })
}

function push_Data_In_Firebase_order(){
  let temp = [];
  db.collection("order").get().then((data)=>{
    var temp_list_id = [];
    data.forEach((product)=>{
      temp.push(product.data());
      temp_list_id.push(product.id);
    })
    
    let temp_data = show_data(temp)
    load_order_new(temp,temp_list_id);
    let parsing = {
      xAxisKey: 'month_string',
      yAxisKey: 'amount'
      };

    fetch_Chart_Api(temp_data,'Amount order',parsing); //show chart_order
  })
}

function push_Data_In_Firebase_income(){
  let temp = [];
  db.collection("order").get().then((data)=>{
    var temp_list_id = [];
    data.forEach((product)=>{
      temp.push(product.data());
      temp_list_id.push(product.id);
    })
    
    let temp_data = show_data_income(temp);
    let parsing = {
      xAxisKey: 'month_string',
      yAxisKey: 'amount'
      };

    fetch_Chart_Api(temp_data,'income',parsing); //show chart_order
  })
}

function fetch_Chart_Api(data_temp,label,parsing){
  const data = {
    datasets: [{
      label: label,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: data_temp,
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {
      parsing: parsing
    }
  };

  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}
