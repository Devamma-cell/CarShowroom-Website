document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       DATA
    ========================= */

    let adminCars = [];

    if (typeof cars !== "undefined") {
        adminCars = cars;
    } else {
        adminCars = JSON.parse(
            localStorage.getItem("veloraCars") || "[]"
        );
    }

    let adminBrands = [];

    if (typeof brands !== "undefined") {
        adminBrands = brands;
    } else {
        adminBrands = JSON.parse(
            localStorage.getItem("veloraBrands") || "[]"
        );
    }


    let bookings = JSON.parse(
        localStorage.getItem("veloraBookings") || "[]"
    );


    let messages = JSON.parse(
        localStorage.getItem("veloraMessages") || "[]"
    );


    let categories = [
        "SUV",
        "Sedan",
        "Hatchback",
        "Coupe",
        "Electric"
    ];


    /* =========================
       SIDEBAR NAVIGATION
    ========================= */

    const menuItems =
        document.querySelectorAll(".admin-menu");


    menuItems.forEach(function (item) {

        item.addEventListener("click", function (e) {

            e.preventDefault();

            const section =
                item.getAttribute("data-section");

            showSection(section);

        });

    });


    function showSection(sectionName) {

        document
            .querySelectorAll(".admin-section")
            .forEach(function (section) {

                section.classList.remove("active");

            });


        const target =
            document.getElementById(sectionName);


        if (target) {

            target.classList.add("active");

        }


        menuItems.forEach(function (item) {

            item.classList.remove("active");

            if (
                item.getAttribute("data-section")
                === sectionName
            ) {

                item.classList.add("active");

            }

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        if (sectionName === "dashboard") {
            renderDashboard();
        }

        if (sectionName === "vehicles") {
            renderVehicleManagement();
        }

        if (sectionName === "brands") {
            renderBrands();
        }

        if (sectionName === "categories") {
            renderCategories();
        }

        if (sectionName === "bookings") {
            renderBookings();
        }

        if (sectionName === "messages") {
            renderMessages();
        }

    }


    /* =========================
       SAVE DATA
    ========================= */

    function saveCars() {

        localStorage.setItem(
            "veloraCars",
            JSON.stringify(adminCars)
        );

    }


    function saveBrands() {

        localStorage.setItem(
            "veloraBrands",
            JSON.stringify(adminBrands)
        );

    }


    function saveBookings() {

        localStorage.setItem(
            "veloraBookings",
            JSON.stringify(bookings)
        );

    }


    function saveMessages() {

        localStorage.setItem(
            "veloraMessages",
            JSON.stringify(messages)
        );

    }


    /* =========================
       DASHBOARD
    ========================= */

    function renderDashboard() {

        document.getElementById(
            "adminVehicleCount"
        ).textContent = adminCars.length;


        document.getElementById(
            "adminBrandCount"
        ).textContent = adminBrands.length;


        document.getElementById(
            "adminBookingCount"
        ).textContent = bookings.length;


        document.getElementById(
            "adminMessageCount"
        ).textContent = messages.length;


        renderVehicleTable(
            document.getElementById(
                "adminVehicleTable"
            )
        );


        renderBookingsPreview();

        renderCategoryBars();

    }


    /* =========================
       VEHICLE TABLE
    ========================= */

    function renderVehicleTable(table) {

        if (!table) return;


        const searchInput =
            document.getElementById(
                "adminSearch"
            );


        const search =
            searchInput
                ? searchInput.value.toLowerCase()
                : "";


        const filtered =
            adminCars.filter(function (car) {

                return (

                    String(car.name || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(car.brand || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(car.category || "")
                        .toLowerCase()
                        .includes(search)

                );

            });


        if (filtered.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7">
                        <div class="empty-state">
                            <i class="bi bi-car-front fs-1"></i>
                            <h5>No vehicles found</h5>
                            <p>Try another search.</p>
                        </div>
                    </td>
                </tr>
            `;

            return;

        }


        table.innerHTML =
            filtered.map(function (car) {

                return `
                    <tr>

                        <td>
                            <div class="d-flex align-items-center gap-2">

                                <img
                                    src="${car.image || ""}"
                                    class="admin-table-img"
                                    onerror="this.style.display='none'">

                                <strong>
                                    ${car.name}
                                </strong>

                            </div>
                        </td>

                        <td>${car.brand}</td>

                        <td>${car.category}</td>

                        <td>${car.fuel}</td>

                        <td>
                            ₹${Number(
                                car.price || 0
                            ).toLocaleString("en-IN")} L
                        </td>

                        <td>

                            <span class="
                                status-badge
                                ${
                                    car.status === "Sold"
                                    ? "status-sold"
                                    : "status-available"
                                }
                            ">

                                ${car.status || "Available"}

                            </span>

                        </td>

                        <td class="action-buttons">

                            <button
                                class="btn btn-sm btn-outline-primary"
                                onclick="editVehicle(${car.id})">

                                <i class="bi bi-pencil"></i>

                            </button>

                            <button
                                class="btn btn-sm btn-outline-danger"
                                onclick="deleteVehicle(${car.id})">

                                <i class="bi bi-trash"></i>

                            </button>

                        </td>

                    </tr>
                `;

            }).join("");

    }


    /* =========================
       VEHICLE MANAGEMENT
    ========================= */

    function renderVehicleManagement() {

        renderVehicleTable(
            document.getElementById(
                "vehicleManagementTable"
            )
        );

    }


    const search =
        document.getElementById(
            "adminSearch"
        );


    if (search) {

        search.addEventListener(
            "input",
            function () {

                renderVehicleTable(
                    document.getElementById(
                        "adminVehicleTable"
                    )
                );

                renderVehicleManagement();

            }
        );

    }


    /* =========================
       ADD VEHICLE
    ========================= */

    const vehicleForm =
        document.getElementById(
            "addVehicleForm"
        );


    if (vehicleForm) {

        vehicleForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const formData =
                    new FormData(vehicleForm);


                const newCar = {

                    id: Date.now(),

                    name:
                        formData.get("name"),

                    brand:
                        formData.get("brand"),

                    category:
                        formData.get("category"),

                    fuel:
                        formData.get("fuel"),

                    price:
                        Number(
                            formData.get("price")
                        ),

                    year:
                        new Date()
                            .getFullYear(),

                    km:
                        "0 km",

                    transmission:
                        "Automatic",

                    image:
                        formData.get("image"),

                    featured:
                        false,

                    status:
                        "Available"

                };


                adminCars.push(newCar);

                saveCars();


                vehicleForm.reset();


                const modal =
                    bootstrap.Modal
                        .getInstance(
                            document.getElementById(
                                "vehicleModal"
                            )
                        );


                if (modal) {
                    modal.hide();
                }


                updateAll();

                showToast(
                    "Vehicle added successfully."
                );

            }
        );

    }


    /* =========================
       EDIT VEHICLE
    ========================= */

    window.editVehicle =
        function (id) {

            const car =
                adminCars.find(
                    function (item) {
                        return item.id == id;
                    }
                );


            if (!car) return;


            const name =
                prompt(
                    "Vehicle name:",
                    car.name
                );


            if (name === null) return;


            const price =
                prompt(
                    "Price in ₹ Lakh:",
                    car.price
                );


            if (price === null) return;


            car.name = name;

            car.price =
                Number(price);


            saveCars();

            updateAll();

            showToast(
                "Vehicle updated."
            );

        };


    /* =========================
       DELETE VEHICLE
    ========================= */

    window.deleteVehicle =
        function (id) {

            const car =
                adminCars.find(
                    function (item) {
                        return item.id == id;
                    }
                );


            if (!car) return;


            const confirmDelete =
                confirm(
                    "Delete " +
                    car.name +
                    "?"
                );


            if (!confirmDelete) return;


            adminCars =
                adminCars.filter(
                    function (item) {
                        return item.id != id;
                    }
                );


            saveCars();

            updateAll();

            showToast(
                "Vehicle deleted."
            );

        };


    /* =========================
       BRANDS
    ========================= */

    function renderBrands() {

        const container =
            document.getElementById(
                "brandList"
            );


        if (!container) return;


        if (adminBrands.length === 0) {

            container.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        No brands found.
                    </div>
                </div>
            `;

            return;

        }


        container.innerHTML =
            adminBrands.map(
                function (brand, index) {

                    const count =
                        adminCars.filter(
                            function (car) {
                                return car.brand === brand.name;
                            }
                        ).length;


                    return `

                        <div class="col-md-6 col-xl-4">

                            <div class="brand-admin-card">

                                <div class="d-flex
                                    justify-content-between
                                    align-items-center">

                                    <div>

                                        <h4>
                                            ${
                                                brand.name ||
                                                brand
                                            }
                                        </h4>

                                        <p class="text-muted mb-2">
                                            ${count}
                                            vehicles
                                        </p>

                                    </div>

                                    <i class="
                                        bi bi-award
                                        fs-1
                                        text-primary
                                    "></i>

                                </div>

                                <div class="d-flex gap-2 mt-3">

                                    <button
                                        class="btn btn-sm btn-outline-primary"
                                        onclick="editBrand(${index})">

                                        Edit

                                    </button>

                                    <button
                                        class="btn btn-sm btn-outline-danger"
                                        onclick="deleteBrand(${index})">

                                        Delete

                                    </button>

                                </div>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    }


    window.addBrand =
        function () {

            const name =
                prompt(
                    "Enter brand name:"
                );


            if (!name) return;


            const exists =
                adminBrands.some(
                    function (brand) {

                        return (
                            (
                                brand.name ||
                                brand
                            ).toLowerCase()
                            === name.toLowerCase()
                        );

                    }
                );


            if (exists) {

                showToast(
                    "Brand already exists."
                );

                return;

            }


            adminBrands.push({
                name: name,
                short: name
                    .substring(0, 2)
                    .toUpperCase(),
                count: 0,
                desc: "Premium automobile brand"
            });


            saveBrands();

            updateAll();

            showToast(
                "Brand added."
            );

        };


    window.editBrand =
        function (index) {

            const brand =
                adminBrands[index];


            if (!brand) return;


            const oldName =
                brand.name ||
                brand;


            const newName =
                prompt(
                    "Brand name:",
                    oldName
                );


            if (!newName) return;


            if (typeof brand === "object") {

                brand.name = newName;

            } else {

                adminBrands[index] =
                    {
                        name: newName,
                        short: newName
                            .substring(0, 2)
                            .toUpperCase()
                    };

            }


            adminCars.forEach(
                function (car) {

                    if (
                        car.brand === oldName
                    ) {

                        car.brand =
                            newName;

                    }

                }
            );


            saveBrands();

            saveCars();

            updateAll();

            showToast(
                "Brand updated."
            );

        };


    window.deleteBrand =
        function (index) {

            const brand =
                adminBrands[index];


            if (!brand) return;


            const brandName =
                brand.name ||
                brand;


            const used =
                adminCars.some(
                    function (car) {
                        return car.brand === brandName;
                    }
                );


            if (used) {

                showToast(
                    "This brand is used by a vehicle."
                );

                return;

            }


            if (
                !confirm(
                    "Delete " +
                    brandName +
                    "?"
                )
            ) return;


            adminBrands.splice(
                index,
                1
            );


            saveBrands();

            updateAll();

            showToast(
                "Brand deleted."
            );

        };


    /* =========================
       CATEGORIES
    ========================= */

    function renderCategories() {

        const container =
            document.getElementById(
                "categoryList"
            );


        if (!container) return;


        const uniqueCategories =
            [
                ...new Set(
                    adminCars.map(
                        function (car) {
                            return car.category;
                        }
                    )
                ),
                ...categories
            ];


        const finalCategories =
            [
                ...new Set(
                    uniqueCategories
                )
            ];


        container.innerHTML =
            finalCategories.map(
                function (category) {

                    const count =
                        adminCars.filter(
                            function (car) {
                                return (
                                    car.category
                                    === category
                                );
                            }
                        ).length;


                    return `

                        <div class="col-md-6 col-xl-4">

                            <div class="category-card">

                                <i class="
                                    bi bi-tags
                                    fs-1
                                    text-primary
                                "></i>

                                <h4 class="mt-3">
                                    ${category}
                                </h4>

                                <p class="text-muted">
                                    ${count}
                                    vehicles
                                </p>

                                <button
                                    class="btn btn-sm btn-outline-danger"
                                    onclick="deleteCategory('${category}')">

                                    Delete

                                </button>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    }


    window.addCategory =
        function () {

            const category =
                prompt(
                    "Enter category:"
                );


            if (!category) return;


            if (
                categories.includes(
                    category
                )
            ) {

                showToast(
                    "Category already exists."
                );

                return;

            }


            categories.push(
                category
            );


            renderCategories();

            showToast(
                "Category added."
            );

        };


    window.deleteCategory =
        function (category) {

            const used =
                adminCars.some(
                    function (car) {

                        return (
                            car.category
                            === category
                        );

                    }
                );


            if (used) {

                showToast(
                    "Cannot delete a category currently used by vehicles."
                );

                return;

            }


            categories =
                categories.filter(
                    function (item) {
                        return item !== category;
                    }
                );


            renderCategories();

            showToast(
                "Category deleted."
            );

        };


    /* =========================
       BOOKINGS
    ========================= */

    function renderBookings() {

        const table =
            document.getElementById(
                "bookingTable"
            );


        if (!table) return;


        if (!bookings.length) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        <div class="empty-state">
                            No test-drive bookings.
                        </div>
                    </td>
                </tr>
            `;

            return;

        }


        table.innerHTML =
            bookings.map(
                function (booking, index) {

                    return `

                        <tr>

                            <td>
                                ${booking.name || "Customer"}
                            </td>

                            <td>
                                ${booking.car || "-"}
                            </td>

                            <td>
                                ${booking.date || "-"}
                            </td>

                            <td>
                                ${booking.time || "-"}
                            </td>

                            <td>

                                <span class="
                                    status-badge
                                    ${
                                        booking.status ===
                                        "Confirmed"
                                        ? "status-confirmed"
                                        : "status-pending"
                                    }
                                ">

                                    ${
                                        booking.status ||
                                        "Pending"
                                    }

                                </span>

                            </td>

                            <td>

                                <button
                                    class="btn btn-sm btn-outline-success"
                                    onclick="confirmBooking(${index})">

                                    <i class="bi bi-check"></i>

                                </button>

                                <button
                                    class="btn btn-sm btn-outline-danger"
                                    onclick="deleteBooking(${index})">

                                    <i class="bi bi-trash"></i>

                                </button>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }


    function renderBookingsPreview() {

        const container =
            document.getElementById(
                "bookingList"
            );


        if (!container) return;


        if (!bookings.length) {

            container.innerHTML =
                `<p class="text-muted">
                    No bookings yet.
                </p>`;

            return;

        }


        container.innerHTML =
            bookings.slice(0, 5)
                .map(
                    function (booking) {

                        return `

                            <div class="
                                d-flex
                                justify-content-between
                                border-bottom
                                py-3
                            ">

                                <div>

                                    <strong>
                                        ${
                                            booking.name ||
                                            "Customer"
                                        }
                                    </strong>

                                    <div class="small text-muted">
                                        ${
                                            booking.car ||
                                            "Vehicle"
                                        }
                                    </div>

                                </div>

                                <span class="
                                    status-badge
                                    ${
                                        booking.status ===
                                        "Confirmed"
                                        ? "status-confirmed"
                                        : "status-pending"
                                    }
                                ">

                                    ${
                                        booking.status ||
                                        "Pending"
                                    }

                                </span>

                            </div>

                        `;

                    }
                ).join("");

    }


    window.confirmBooking =
        function (index) {

            if (!bookings[index]) return;


            bookings[index].status =
                "Confirmed";


            saveBookings();

            updateAll();

            showToast(
                "Test drive confirmed."
            );

        };


    window.deleteBooking =
        function (index) {

            if (
                !confirm(
                    "Delete this booking?"
                )
            ) return;


            bookings.splice(
                index,
                1
            );


            saveBookings();

            updateAll();

            showToast(
                "Booking deleted."
            );

        };


    /* =========================
       CATEGORY BARS
    ========================= */

    function renderCategoryBars() {

        const container =
            document.getElementById(
                "categoryBars"
            );


        if (!container) return;


        const count = {};


        adminCars.forEach(
            function (car) {

                const category =
                    car.category ||
                    "Other";


                count[category] =
                    (count[category] || 0)
                    + 1;

            }
        );


        const max =
            Math.max(
                ...Object.values(count),
                1
            );


        container.innerHTML =
            Object.keys(count)
                .map(
                    function (category) {

                        const value =
                            count[category];


                        const width =
                            (
                                value /
                                max
                            ) * 100;


                        return `

                            <div class="mb-3">

                                <div class="
                                    d-flex
                                    justify-content-between
                                    mb-1
                                ">

                                    <span>
                                        ${category}
                                    </span>

                                    <strong>
                                        ${value}
                                    </strong>

                                </div>

                                <div
                                    class="progress"
                                    style="height:8px">

                                    <div
                                        class="progress-bar"
                                        style="
                                            width:${width}%
                                        ">
                                    </div>

                                </div>

                            </div>

                        `;

                    }
                ).join("");

    }


    /* =========================
       MESSAGES
    ========================= */

    function renderMessages() {

        const container =
            document.getElementById(
                "messageList"
            );


        if (!container) return;


        if (!messages.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <i class="
                        bi bi-chat-left-text
                        fs-1
                    "></i>

                    <h5>No messages</h5>

                    <p>
                        Customer messages will appear here.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            messages.map(
                function (message, index) {

                    return `

                        <div class="message-card">

                            <div class="
                                d-flex
                                justify-content-between
                            ">

                                <div>

                                    <h5>
                                        ${
                                            message.name ||
                                            "Customer"
                                        }
                                    </h5>

                                    <small class="text-muted">
                                        ${
                                            message.email ||
                                            ""
                                        }
                                    </small>

                                </div>

                                <span class="
                                    status-badge
                                    ${
                                        message.read
                                        ? "status-read"
                                        : "status-unread"
                                    }
                                ">

                                    ${
                                        message.read
                                        ? "Read"
                                        : "Unread"
                                    }

                                </span>

                            </div>

                            <p class="mt-3 mb-3">
                                ${
                                    message.message ||
                                    "No message content."
                                }
                            </p>

                            <div>

                                <button
                                    class="btn btn-sm btn-outline-primary"
                                    onclick="markMessageRead(${index})">

                                    Mark as Read

                                </button>

                                <button
                                    class="btn btn-sm btn-outline-danger"
                                    onclick="deleteMessage(${index})">

                                    Delete

                                </button>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    }


    window.markMessageRead =
        function (index) {

            if (!messages[index]) return;


            messages[index].read =
                true;


            saveMessages();

            updateAll();

            showToast(
                "Message marked as read."
            );

        };


    window.deleteMessage =
        function (index) {

            if (
                !confirm(
                    "Delete this message?"
                )
            ) return;


            messages.splice(
                index,
                1
            );


            saveMessages();

            updateAll();

            showToast(
                "Message deleted."
            );

        };


    /* =========================
       BRAND SELECT
    ========================= */

    function populateBrandSelect() {

        const select =
            document.getElementById(
                "adminBrandSelect"
            );


        if (!select) return;


        select.innerHTML =
            adminBrands.map(
                function (brand) {

                    const name =
                        brand.name ||
                        brand;


                    return `
                        <option value="${name}">
                            ${name}
                        </option>
                    `;

                }
            ).join("");

    }


    /* =========================
       UPDATE EVERYTHING
    ========================= */

    function updateAll() {

        populateBrandSelect();

        renderDashboard();

        renderVehicleManagement();

        renderBrands();

        renderCategories();

        renderBookings();

        renderMessages();

    }


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        let mount =
            document.getElementById(
                "toastMount"
            );


        if (!mount) return;


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "position-fixed bottom-0 end-0 p-3";


        toast.style.zIndex =
            "9999";


        toast.innerHTML = `

            <div class="
                toast
                show
                text-bg-dark
            ">

                <div class="
                    d-flex
                    align-items-center
                ">

                    <div class="toast-body">
                        ${message}
                    </div>

                    <button
                        type="button"
                        class="btn-close btn-close-white me-2"
                        onclick="this.closest('.toast').remove()">
                    </button>

                </div>

            </div>

        `;


        mount.appendChild(toast);


        setTimeout(
            function () {

                toast.remove();

            },
            3000
        );

    }


    /* =========================
       INITIAL LOAD
    ========================= */

    populateBrandSelect();

    updateAll();

});
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        // Clear admin login session
        sessionStorage.removeItem("veloraAdmin");

        // Also clear common login flags if used
        localStorage.removeItem("veloraAdminLoggedIn");

        // Redirect to login page
        window.location.href = "login.html";
    });
}