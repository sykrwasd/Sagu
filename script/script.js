 async function addSales(){

    console.log("hello")
  const name = document.getElementById('n').value;
  const quantity = document.getElementById('q').value;
  const location = document.getElementById('l').value;
  const progress = document.getElementById('p').value || "In Progress";
const date = new Date().toISOString(); 

    try {
        const response = await fetch('http://localhost:3000/add', {
            method: 'Post',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity, location, progress }),
        })

         const data = await response.json();
        
        if (response.ok) {
           alert("successfully added")
        } else {
           alert("error")
        }
        
    } catch (error) {
        
    }
}

async function getSales() {
  try {
    const response = await fetch('http://localhost:3000/getSales');

    if (!response.ok) {
      alert('Failed to fetch sales');
    }

    const data = await response.json();
    console.log(data); 
    const tableBody = document.getElementById('user-table-body');
    //tableBody.innerHTML = ''; 
    
    data.forEach((sale) => {
        const row = document.createElement('tr');
        
        const formattedDate = new Date(sale.Date).toLocaleDateString('en-GB');

        const selectColor =
            sale.progress === "Pending" ? "background-color: yellow; color: black;" :
            sale.progress === "Cancelled" ? "background-color: red; color: white;" :
            sale.progress === "Done" ? "background-color: rgb(73, 235, 52); color: white;" :
            "";
      row.innerHTML = `
  <td>${sale.name}</td>
  <td>${sale.quantity}</td>
  <td>${sale.location}</td>
  <td>
    <select style="${selectColor}" data-id="${sale._id}">
      <option value="Pending" ${sale.progress === "Pending" ? "selected" : ""}>Pending</option>
      <option value="Cancelled" ${sale.progress === "Cancelled" ? "selected" : ""}>Cancelled</option>
      <option value="Done" ${sale.progress === "Done" ? "selected" : ""}>Done</option>
    </select>
  </td>
  <td>${formattedDate}</td>
`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    alert('Error fetching sales data');
  }
}

async function Update() {
  const tableRows = document.querySelectorAll('#user-table-body tr');
  const updates = [];

 tableRows.forEach((row) => {
  const select = row.querySelector('select');
  const progress = select.value;
  const _id = select.getAttribute('data-id'); // Get the ID from the select tag

  updates.push({ _id, progress });
});


  try {
    const response = await fetch('http://localhost:3000/updateProgress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }), //sending the array into server
    });

    const result = await response.json();
    if (response.ok) {
    console.log(result)
      
    } else {
      alert('Error updating progress.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong.');
  }

  await getSales();
  window.location.reload();
}
