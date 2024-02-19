// Function to handle seat selection
function selectSeat(seatId) {
    const seatElement = document.getElementById(seatId);
    const selectedSeats = document.querySelectorAll('.bg-green-500');
    const seatLeftElement = document.getElementById('seat-left');
    const selectedSeatsElement = document.getElementById('selected-seat');
    const totalElement = document.getElementById('total');
    const grandTotalElement = document.getElementById('grand-total');
    const currentSeatLeft = parseInt(seatLeftElement.textContent);
    const pricePerSeat = 550;
    const priceContainer = document.getElementById('price-container');
    const couponSection = document.getElementById('coupon'); // Get the coupon section

    // Check if the seat selection should proceed
    if (selectedSeats.length < 4 && seatElement.classList.contains('bg-gray-200')) {
        seatElement.classList.remove('bg-gray-200');
        seatElement.classList.add('bg-green-500');
        seatLeftElement.textContent = currentSeatLeft - 1; // Decrease available seats
        selectedSeatsElement.textContent = selectedSeats.length + 1;
        // Create ticket description HTML
        const ticketHtml = `
            <table class="w-full>
                <tr id="${seatId}-ticket">
                    <td>${seatId}</td>
                    <td class="px-4 py-2">    Economy   </td>
                    <td class="px-4 py-2">${pricePerSeat}</td>
                </tr>
            </table>
        `;

 
        // Append ticket description to price-container
        priceContainer.insertAdjacentHTML('beforeend', ticketHtml);

    } else if (seatElement.classList.contains('bg-green-500')) {
        seatElement.classList.remove('bg-green-500');
        seatElement.classList.add('bg-gray-200');
        seatLeftElement.textContent = currentSeatLeft + 1; // Increase available seats
        selectedSeatsElement.textContent = selectedSeats.length - 1;
       
       
       
        // Remove ticket description from price-container
        const ticketElement = document.getElementById(`${seatId}-ticket`);
        if (ticketElement) {
            ticketElement.remove(); // Remove the ticket HTML element from the DOM
        }
    }

    // Calculate total ticket price
    const selectedSeatsCount = document.querySelectorAll('.bg-green-500').length;
    const totalPrice = selectedSeatsCount * pricePerSeat;
    totalElement.textContent = totalPrice;

    // Apply coupon code discount
    applyCouponDiscount();
}

// Function to apply coupon code discount
function applyCouponDiscount() {
    const couponCodeInput = document.getElementById('coupon-input');
    const couponCode = couponCodeInput.value.trim().toUpperCase();
    const totalElement = document.getElementById('total');
    const grandTotalElement = document.getElementById('grand-total');
    const couponSection = document.getElementById('coupon'); // Get the coupon section

    let totalPrice = parseInt(totalElement.textContent);
    let discountAmount = 0; // Initialize discount amount

    if (couponCode === 'NEW15') {
        discountAmount = totalPrice * 0.15;
    } else if (couponCode === 'COUPLE 20') {
        discountAmount = totalPrice * 0.20;
    }

    const discountedTotalPrice = totalPrice - discountAmount;
    grandTotalElement.textContent = discountedTotalPrice;

    // Remove coupon section from DOM after applying the coupon
    if (discountAmount > 0) {
        couponSection.remove();
    }
}

// Initialize total price and grand total to 0
document.getElementById('total').textContent = '0';
document.getElementById('grand-total').textContent = '0';

// Add event listeners to seat elements dynamically
const seatIds = ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4'];
seatIds.forEach(seatId => {
    document.getElementById(seatId).addEventListener('click', () => selectSeat(seatId));
});

// Add event listener to coupon input
document.getElementById('cupon-btn').addEventListener('click', applyCouponDiscount);