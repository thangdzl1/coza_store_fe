export const jwtToken = localStorage.getItem("token");
export const url = "http://localhost:8080";
export function getAjax(url, data = {}, jwtToken = "") {
  let headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (jwtToken != null) {
    headers['Authorization'] = 'Bearer ' + jwtToken;
  }
  // ajax cho phép gọi đường dẫn ngầm và lấy giá trị của đường dẫn đó
  return $.ajax({
    method: "get",
    url: url,
    data: data,
    headers: headers
  })
}
export function postAjax(url, data = {}, jwtToken = "") {
  let headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (jwtToken != null) {
    headers['Authorization'] = 'Bearer ' + jwtToken;
  }

  return $.ajax({
    method: "POST",
    url: url,
    data: data,
    headers: headers
  });
}