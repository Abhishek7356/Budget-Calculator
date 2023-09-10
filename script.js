



function register() {

    if (regName.value == '' || regPassword.value == '') {
        alert('please Enter details correctly');
    } else {
        const accountDetails = {};
        accountDetails.userName = regName.value;
        accountDetails.userPassword = regPassword.value;
        accountDetails.userBalance = 0;
        accountDetails.income = 0;
        accountDetails.expense = 0;
        console.log(accountDetails);
        if (accountDetails.userName in localStorage) {
            alert('user allready registered');
        } else {
            localStorage.setItem(regName.value, JSON.stringify(accountDetails));
            alert('Registration successfull.');
            location = '../';
            regName.value = '';
        }
    }

}



function signin() {
    if (loginName.value == '' || loginPassword.value == '') {
        alert('please Enter details correctly');
    } else {
        if (loginName.value in localStorage) {
            let acnoDetails = JSON.parse(localStorage.getItem(loginName.value));
            document.getElementById('incorrect2').style.display = 'none';
            document.getElementById('loginName').style.borderBottom = '2px solid white';
            if (loginPassword.value == acnoDetails.userPassword) {
                localStorage.setItem("userName", loginName.value)
                alert('Login Success');
                location = './homePage';
                localStorage.setItem("userDetails", JSON.stringify(acnoDetails));
                document.getElementById('incorrect').style.display = 'none';
                document.getElementById('loginPassword').style.borderBottom = '2px solid gray';
            } else {
                document.getElementById('incorrect').style.display = 'block';
                document.getElementById('loginPassword').style.borderBottom = '2px solid red';
            }
        } else {
            document.getElementById('incorrect2').style.display = 'block';
            document.getElementById('loginName').style.borderBottom = '2px solid red';
        }
    }
}

function pageLoad() {
    document.getElementById('Username').innerHTML = `Welcome ${localStorage.getItem("userName")}`;
    let balance = JSON.parse(localStorage.getItem("userDetails"));
    document.getElementById('amount').innerHTML = `&#8377; ${balance.userBalance}`
    document.getElementById('incomeAmount').innerHTML = `&#8377; ${balance.income}`
    document.getElementById('expenseAmount').innerHTML = `&#8377; ${balance.expense}`;
    if (balance.datas != undefined) {
        document.getElementById('innerContainer').innerHTML = balance.datas;
        document.getElementById('noHistory').style.display = 'none';
    } else {
        document.getElementById('innerContainer').style.display = 'none';
        document.getElementById('clearBtn').style.display = 'none'
    }
}

function pageUnload() {
    let dbs = JSON.parse(localStorage.getItem("userDetails"));
    localStorage.setItem(dbs.userName, JSON.stringify(dbs));
}

function deposite() {
    let deposite = document.getElementById('deposite');
    let description = document.getElementById('description');
    let amount = document.getElementById('amount');
    if (deposite.value == '' || description.value == '') {
        alert('please Enter the details correctly');
    } else {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(userDetails);
        let depoAmount = Number(deposite.value);
        console.log(depoAmount);
        userDetails.userBalance += depoAmount;
        userDetails.income += depoAmount;
        amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
        incomeAmount.innerHTML = `&#8377; ${userDetails.income}`;
        document.getElementById('innerContainer').style.display = 'flex';
        document.getElementById('noHistory').style.display = 'none';
        document.getElementById('clearBtn').style.display = 'block';
        history(deposite.value, description.value, 'incomeHis','<i class="fa-solid fa-plus" style="color: #198754;"></i>');
        let container = document.getElementById('innerContainer');
        userDetails.datas = container.innerHTML;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        deposite.value = '';
        description.value = '';
    }
}

function withdraw() {
    let withdraw = document.getElementById('withdraw');
    let wpassword = document.getElementById('incomeSource');
    let amount = document.getElementById('amount');
    if (withdraw.value == '' || wpassword.value == '') {
        alert('please Enter the detailes correctly ');
    } else {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(userDetails);
        let depoAmount = Number(withdraw.value);
        console.log(depoAmount);
        if (userDetails.userBalance > depoAmount) {
            userDetails.userBalance -= depoAmount;
            userDetails.expense += depoAmount;
            amount.innerHTML = `&#8377; ${userDetails.userBalance}`;
            expenseAmount.innerHTML = `&#8377; ${userDetails.expense}`;
            document.getElementById('innerContainer').style.display = 'flex';
            document.getElementById('noHistory').style.display = 'none';
            document.getElementById('clearBtn').style.display = 'block';
            history(withdraw.value, wpassword.value, 'expenseHis','<i class="fa-solid fa-minus" style="color: #dc3545;"></i>');
            let container = document.getElementById('innerContainer');
            userDetails.datas = container.innerHTML;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            withdraw.value = '';
            wpassword.value = '';
        } else {
            alert('Expense is more than your balance');
        }
    }
}


function clearHistory() {
    let status = confirm("Do you want to clear history Are you sure ?");
    if (status) {
        document.getElementById('expenseHis').innerHTML = null;
        document.getElementById('incomeHis').innerHTML = null;
        document.getElementById('innerContainer').style.display = 'none';
        document.getElementById('noHistory').style.display = 'block';
        document.getElementById('clearBtn').style.display = 'none'
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        let container = document.getElementById('innerContainer');
        userDetails.datas = container.innerHTML;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }

}

function resetBalance(balanceType) {
    let userDetailes = JSON.parse(localStorage.getItem("userDetails"));
    userDetailes[balanceType] = 0;
    expenseAmount.innerHTML = `&#8377; ${userDetailes.expense}`;
    incomeAmount.innerHTML = `&#8377; ${userDetailes.income}`;
    localStorage.setItem("userDetails", JSON.stringify(userDetailes));

}


function clearAll() {
    localStorage.clear();
    location = '../sighUpPage';
}


function history(amount, source, container,tag) {
    let mainDiv = document.getElementById(container);
    let div = document.createElement('div');
    div.classList.add("history");
    let p1 = document.createElement('p');
    p1.innerHTML = source;
    div.appendChild(p1);
    let p2 = document.createElement('p');
    p2.innerHTML = `${tag}    &#8377; ${amount}`;
    div.appendChild(p2);
    mainDiv.appendChild(div);
    console.log('hello');
}

// function saveData() {
//     let container = document.getElementById('innerContainer');
//     let acnoDetails = JSON.parse(localStorage.getItem('userDetails'));
//     acnoDetails.datas = container.innerHTML;
//     console.log(acnoDetails);
//     localStorage.setItem('userDetails', JSON.stringify(acnoDetails));
// }
