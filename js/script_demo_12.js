function showdemo(week) {
  const p = document.querySelector(".show-classdemo");
  console.log("p", p);
  switch (week) {
    case "w1":
      p.innerHTML = `<iframe src="./demo/w01_dom_12/index.html" width="100%" height="100%" />`;
      break;
    case "w2":
      p.innerHTML = `<iframe src="./demo/w02_tictactoe_12/tictactoe_12.html" width="100%" height="100%" />`;
      break;
    case "w3-p1":
      p.innerHTML = `<iframe src="./demo/w03_basics_12/p1_12/p1_12.html" width="100%" height="100%" />`;
      break;
    case "w3-p2":
      p.innerHTML = `<iframe src="./demo/w03_basics_12/p2_12/p2_12.html" width="100%" height="100%" />`;
      break;
    case "w3-p3":
      p.innerHTML = `<iframe src="./demo/w03_basics_12/p3_12/p3_12.html" width="100%" height="100%" />`;
      break;
    case "w4-p4":
      p.innerHTML = `<iframe src="./demo/w04-basics-12/p4_counter_12/p4_12.html" width="100%" height="100%" />`;
      break;
    case "w4-p5":
      p.innerHTML = `<iframe src="./demo/w04-basics-12/p5_12/p5_12.html" width="100%" height="100%" />`;
      break;
    case "w4-p6":
      p.innerHTML = `<iframe src="./demo/w04-basics-12/p6_12/p6_12.html" width="100%" height="100%" />`;
      break;
    case "w5":
        p.innerHTML = `<iframe src="./demo/w05_menu_12/index.html" width="100%" height="100%" />`;
      break;
    case "P1-12":
        p.innerHTML = `<iframe src="./EXAMS/W09/p1_12/p1_12.html" width="100%" height="100%" />`;
      break;
    case "P2-12":
      p.innerHTML = `<iframe src="./EXAMS/W09/p2_12/p2_12.html" width="100%" height="100%" />`;
      break;
    case "P3-12":
      p.innerHTML = `<iframe src="./EXAMS/W09/p3_12/p3_12.html" width="100%" height="100%" />`;
      break;
    case "w11":
        p.innerHTML = `<iframe src="./demo/w11_async_js_11/6-promise-async-await/index.html" width="100%" height="100%" />`;
      break;  
    case "w12":
        p.innerHTML = `<iframe src="./demo/w12_ajax_12/5_json_people_async_await/index.html" width="100%" height="100%" />`;
      break; 
    case "w13":
        p.innerHTML = `<iframe src="./demo/w13_menu_12/index.html" width="100%" height="100%" />`;
      break; 
    case "w14":
        p.innerHTML = `<iframe src="./demo/w14_products_12/products_supa_12.html" width="100%" height="100%" />`;
      break; 
    case "project":
        p.innerHTML = `<iframe src="./project/products_supa_12.html" width="100%" height="100%" />`;
        break;
    }
}
