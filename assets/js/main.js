// Main JavaScript functionality for Sports Facility Booking System

class FacilityBookingApp {
    constructor() {
        this.facilities = [];
        this.categories = [];
        this.timeSlots = [];
        this.currentUser = null;
        this.bookingData = {};
        
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.initEventListeners();
        this.checkAuthStatus();
    }
    
    async loadData() {
        try {
            const response = await fetch('data/facilities.json');
            const data = await response.json();
            this.facilities = data.facilities;
            this.categories = data.categories;
            this.timeSlots = data.timeSlots;
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    }
    
    initEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
        
        // Login form handling
        this.initLoginForm();
        
        // Facility filtering
        this.initFacilityFilters();
        
        // Calendar functionality
        this.initCalendar();
        
        // Time slot selection
        this.initTimeSlotSelection();
        
        // Booking form
        this.initBookingForm();
    }
    
    initLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        
        if (loginTab && registerTab) {
            loginTab.addEventListener('click', () => {
                this.switchTab('login');
            });
            
            registerTab.addEventListener('click', () => {
                this.switchTab('register');
            });
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }
    
    switchTab(tab) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        
        if (tab === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
        }
    }
    
    handleLogin() {
        // Simulate login
        this.currentUser = {
            id: 1,
            name: '田中太郎',
            email: 'tanaka@example.com'
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        window.location.href = 'facilities.html';
    }
    
    handleRegister() {
        // Simulate registration
        this.currentUser = {
            id: 1,
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        window.location.href = 'facilities.html';
    }
    
    checkAuthStatus() {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            this.updateAuthUI();
        }
    }
    
    updateAuthUI() {
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn && this.currentUser) {
            loginBtn.textContent = this.currentUser.name + 'さん';
            loginBtn.href = 'mypage.html';
        }
    }
    
    initFacilityFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const searchBtn = document.getElementById('searchBtn');
        
        if (categoryFilter) {
            this.populateCategoryFilter(categoryFilter);
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterFacilities();
            });
        }
        
        // Initialize facility list on page load
        if (document.getElementById('facilityList')) {
            this.displayFacilities(this.facilities);
        }
    }
    
    populateCategoryFilter(selectElement) {
        selectElement.innerHTML = '<option value="">すべてのカテゴリ</option>';
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            selectElement.appendChild(option);
        });
    }
    
    filterFacilities() {
        const keyword = document.getElementById('keyword')?.value || '';
        const category = document.getElementById('categoryFilter')?.value || '';
        const area = document.getElementById('areaFilter')?.value || '';
        
        let filtered = this.facilities;
        
        if (keyword) {
            filtered = filtered.filter(facility => 
                facility.name.includes(keyword) || 
                facility.description.includes(keyword)
            );
        }
        
        if (category) {
            filtered = filtered.filter(facility => facility.category === category);
        }
        
        if (area) {
            filtered = filtered.filter(facility => facility.address.includes(area));
        }
        
        this.displayFacilities(filtered);
    }
    
    displayFacilities(facilities) {
        const facilityList = document.getElementById('facilityList');
        if (!facilityList) return;
        
        facilityList.innerHTML = '';
        
        facilities.forEach(facility => {
            const facilityCard = this.createFacilityCard(facility);
            facilityList.appendChild(facilityCard);
        });
    }
    
    createFacilityCard(facility) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${facility.image}" alt="${facility.name}" class="card-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNnB4IiBmaWxsPSIjNmI3MjgwIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='">
            <h3 class="card-title">${facility.name}</h3>
            <p class="card-text">${facility.description}</p>
            <p class="card-text"><strong>住所:</strong> ${facility.address}</p>
            <p class="card-text"><strong>基本料金:</strong> ¥${facility.basePrice.toLocaleString()}/時間</p>
            <a href="facility-detail.html?id=${facility.id}" class="btn btn-primary">詳細を見る</a>
        `;
        return card;
    }
    
    initCalendar() {
        const calendar = document.getElementById('calendar');
        if (!calendar) return;
        
        this.currentCalendarDate = new Date();
        this.displayCalendar(this.currentCalendarDate);
        
        // Month navigation
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
                this.displayCalendar(this.currentCalendarDate);
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
                this.displayCalendar(this.currentCalendarDate);
            });
        }
    }
    
    displayCalendar(date) {
        const monthYear = document.getElementById('monthYear');
        const calendarGrid = document.getElementById('calendarGrid');
        
        if (!monthYear || !calendarGrid) return;
        
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        monthYear.textContent = `${date.getFullYear()}年 ${months[date.getMonth()]}`;
        
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
        dayHeaders.forEach(header => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = header;
            calendarGrid.appendChild(dayHeader);
        });
        
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < 42; i++) {
            const currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDay.getDate();
            
            // Past dates or different month
            if (currentDay < today || currentDay.getMonth() !== date.getMonth()) {
                dayElement.classList.add('unavailable');
                if (currentDay.getMonth() !== date.getMonth()) {
                    dayElement.style.opacity = '0.3';
                }
            } else {
                // Future dates in current month
                dayElement.addEventListener('click', () => {
                    this.selectDate(currentDay);
                });
                
                // Check availability (mock data - available on odd days)
                if (this.isDateAvailable(currentDay)) {
                    dayElement.classList.add('available');
                } else {
                    dayElement.classList.add('unavailable');
                }
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    isDateAvailable(date) {
        // Mock availability check
        return date.getDate() % 2 === 1 && date >= new Date();
    }
    
    selectDate(date) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selection to clicked date
        event.target.classList.add('selected');
        
        // Store selected date
        this.bookingData.selectedDate = date;
        
        // Navigate to booking page if on facility detail page
        const facilityId = new URLSearchParams(window.location.search).get('id');
        if (facilityId) {
            window.location.href = `booking.html?facilityId=${facilityId}&date=${date.toISOString().split('T')[0]}`;
        }
    }
    
    initTimeSlotSelection() {
        const timeSlotContainer = document.getElementById('timeSlots');
        if (!timeSlotContainer) return;
        
        // Clear existing slots
        timeSlotContainer.innerHTML = '';
        
        this.timeSlots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot.label;
            slotElement.dataset.slotId = slot.id;
            slotElement.dataset.price = slot.price;
            
            // Mock availability - make most slots available
            if (Math.random() > 0.2) {
                slotElement.addEventListener('click', () => {
                    this.toggleTimeSlot(slotElement);
                });
            } else {
                slotElement.classList.add('unavailable');
            }
            
            timeSlotContainer.appendChild(slotElement);
        });
    }
    
    toggleTimeSlot(element) {
        element.classList.toggle('selected');
        this.updateBookingCalculation();
    }
    
    updateBookingCalculation() {
        const selectedSlots = document.querySelectorAll('.time-slot.selected');
        const facilityId = new URLSearchParams(window.location.search).get('facilityId');
        const facility = this.facilities.find(f => f.id == facilityId);
        
        if (facility) {
            let total = 0;
            selectedSlots.forEach(slot => {
                const priceMultiplier = parseFloat(slot.dataset.price);
                total += facility.basePrice * priceMultiplier;
            });
            
            const totalPriceElement = document.getElementById('totalPrice');
            if (totalPriceElement) {
                totalPriceElement.textContent = `¥${total.toLocaleString()}`;
            }
        }
    }
    
    initBookingForm() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmit();
            });
        }
        
        // Equipment selection
        const equipmentCheckboxes = document.querySelectorAll('input[name="equipment"]');
        equipmentCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateBookingCalculation();
            });
        });
    }
    
    handleBookingSubmit() {
        // Collect booking data
        const selectedSlots = Array.from(document.querySelectorAll('.time-slot.selected'))
            .map(slot => slot.dataset.slotId);
        
        const selectedEquipment = Array.from(document.querySelectorAll('input[name="equipment"]:checked'))
            .map(checkbox => checkbox.value);
        
        this.bookingData = {
            ...this.bookingData,
            timeSlots: selectedSlots,
            equipment: selectedEquipment,
            purpose: document.getElementById('purpose')?.value,
            participants: document.getElementById('participants')?.value
        };
        
        // Store in localStorage for confirmation page
        localStorage.setItem('bookingData', JSON.stringify(this.bookingData));
        
        // Navigate to confirmation page
        window.location.href = 'booking-confirm.html';
    }
    
    loadFacilityDetail() {
        const facilityId = new URLSearchParams(window.location.search).get('id');
        if (!facilityId) return;
        
        const facility = this.facilities.find(f => f.id == facilityId);
        if (!facility) return;
        
        // Update page content
        document.getElementById('facilityName').textContent = facility.name;
        document.getElementById('facilityImage').src = facility.image;
        document.getElementById('facilityDescription').textContent = facility.description;
        document.getElementById('facilityAddress').textContent = facility.address;
        document.getElementById('facilityPhone').textContent = facility.phone;
        document.getElementById('facilityPrice').textContent = `¥${facility.basePrice.toLocaleString()}/時間`;
        
        // Equipment list
        const equipmentList = document.getElementById('equipmentList');
        if (equipmentList) {
            equipmentList.innerHTML = facility.equipment.map(item => `<li>${item}</li>`).join('');
        }
        
        // Rules list
        const rulesList = document.getElementById('rulesList');
        if (rulesList) {
            rulesList.innerHTML = facility.rules.map(rule => `<li>${rule}</li>`).join('');
        }
    }
    
    loadBookingConfirmation() {
        const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
        const facilityId = new URLSearchParams(window.location.search).get('facilityId');
        const facility = this.facilities.find(f => f.id == facilityId);
        
        if (facility && bookingData) {
            // Display booking details
            document.getElementById('confirmFacilityName').textContent = facility.name;
            document.getElementById('confirmDate').textContent = bookingData.selectedDate || '未選択';
            document.getElementById('confirmTimeSlots').textContent = bookingData.timeSlots?.join(', ') || '未選択';
            document.getElementById('confirmPurpose').textContent = bookingData.purpose || '未選択';
            document.getElementById('confirmParticipants').textContent = bookingData.participants || '未選択';
            document.getElementById('confirmEquipment').textContent = bookingData.equipment?.join(', ') || 'なし';
        }
    }
    
    confirmBooking() {
        // Generate booking ID
        const bookingId = 'BK' + Date.now();
        
        // Store booking confirmation
        localStorage.setItem('lastBookingId', bookingId);
        localStorage.removeItem('bookingData');
        
        // Navigate to completion page
        window.location.href = 'booking-complete.html';
    }
    
    loadBookingComplete() {
        const bookingId = localStorage.getItem('lastBookingId');
        if (bookingId) {
            document.getElementById('bookingId').textContent = bookingId;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.facilityApp = new FacilityBookingApp();
    
    // Page-specific initialization
    const page = window.location.pathname.split('/').pop();
    
    switch(page) {
        case 'facility-detail.html':
            setTimeout(() => window.facilityApp.loadFacilityDetail(), 100);
            break;
        case 'booking-confirm.html':
            setTimeout(() => window.facilityApp.loadBookingConfirmation(), 100);
            break;
        case 'booking-complete.html':
            setTimeout(() => window.facilityApp.loadBookingComplete(), 100);
            break;
    }
});

// Utility functions
function formatDate(date) {
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function formatPrice(price) {
    return `¥${price.toLocaleString()}`;
}