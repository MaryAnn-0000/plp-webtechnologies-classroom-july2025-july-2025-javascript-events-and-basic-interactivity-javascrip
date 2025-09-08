        // ========================================
        // PART 1: EVENT HANDLING & INTERACTIVE ELEMENTS
        // ========================================

        /**
         * Theme Toggle Functionality
         * Demonstrates: click event handling, classList manipulation, localStorage
         */
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Load saved theme or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Light Mode';
        }

        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });

        /**
         * Counter Game
         * Demonstrates: click events, DOM content manipulation, state management
         */
        let counter = 0;
        const counterDisplay = document.getElementById('counterDisplay');
        const incrementBtn = document.getElementById('incrementBtn');
        const decrementBtn = document.getElementById('decrementBtn');
        const resetBtn = document.getElementById('resetBtn');

        function updateCounterDisplay() {
            counterDisplay.textContent = counter;
            
            // Add visual feedback for different values
            counterDisplay.style.color = counter > 0 ? '#26de81' : counter < 0 ? '#ff6b6b' : '#667eea';
            
            // Add bounce animation
            counterDisplay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterDisplay.style.transform = 'scale(1)';
            }, 150);
        }

        incrementBtn.addEventListener('click', function() {
            counter++;
            updateCounterDisplay();
        });

        decrementBtn.addEventListener('click', function() {
            counter--;
            updateCounterDisplay();
        });

        resetBtn.addEventListener('click', function() {
            counter = 0;
            updateCounterDisplay();
        });

        // ========================================
        // PART 2: INTERACTIVE FEATURES
        // ========================================

        /**
         * Collapsible FAQ Section
         * Demonstrates: click events, classList manipulation, smooth animations
         */
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const arrow = this.querySelector('.faq-arrow');

                // Close other FAQ items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherItem = otherQuestion.parentElement;
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherArrow = otherQuestion.querySelector('.faq-arrow');
                        
                        otherAnswer.classList.remove('active');
                        otherArrow.classList.remove('rotated');
                    }
                });

                // Toggle current FAQ item
                answer.classList.toggle('active');
                arrow.classList.toggle('rotated');
            });
        });

        /**
         * Tabbed Interface
         * Demonstrates: event delegation, data attributes, content switching
         */
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                document.getElementById(targetTab + '-panel').classList.add('active');
            });
        });

        // ========================================
        // PART 3: FORM VALIDATION WITH JAVASCRIPT
        // ========================================

        /**
         * Custom Form Validation System
         * Demonstrates: input events, regular expressions, custom validation logic
         */
        const form = document.getElementById('registrationForm');
        const formSuccess = document.getElementById('formSuccess');

        // Validation rules and patterns
        const validationRules = {
            fullName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Name must contain only letters and spaces (min 2 characters)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                required: false,
                pattern: /^[\+]?[\d\s\-\(\)]{10,}$/,
                message: 'Please enter a valid phone number (min 10 digits)'
            },
            password: {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must be 8+ chars with uppercase, lowercase, number, and special character'
            },
            age: {
                required: false,
                min: 13,
                max: 120,
                message: 'Age must be between 13 and 120'
            },
            website: {
                required: false,
                pattern: /^https?:\/\/.+\..+/,
                message: 'Please enter a valid URL (starting with http:// or https://)'
            },
            bio: {
                required: false,
                maxLength: 200,
                message: 'Bio must be less than 200 characters'
            }
        };

        /**
         * Validate individual field
         */
        function validateField(fieldName, value) {
            const rules = validationRules[fieldName];
            if (!rules) return { isValid: true };

            // Check if field is required and empty
            if (rules.required && (!value || value.trim() === '')) {
                return { isValid: false, message: `${fieldName} is required` };
            }

            // If field is empty and not required, it's valid
            if (!value || value.trim() === '') {
                return { isValid: true };
            }

            // Check minimum length
            if (rules.minLength && value.length < rules.minLength) {
                return { isValid: false, message: rules.message };
            }

            // Check maximum length
            if (rules.maxLength && value.length > rules.maxLength) {
                return { isValid: false, message: rules.message };
            }

            // Check numeric range
            if (rules.min !== undefined || rules.max !== undefined) {
                const numValue = parseInt(value);
                if (isNaN(numValue) || (rules.min && numValue < rules.min) || (rules.max && numValue > rules.max)) {
                    return { isValid: false, message: rules.message };
                }
            }

            // Check pattern
            if (rules.pattern && !rules.pattern.test(value)) {
                return { isValid: false, message: rules.message };
            }

            return { isValid: true };
        }

        /**
         * Show validation feedback
         */
        function showValidationFeedback(fieldName, isValid, message = '') {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + 'Error');
            const successElement = document.getElementById(fieldName + 'Success');

            if (isValid) {
                field.classList.remove('error');
                field.classList.add('success');
                errorElement.style.display = 'none';
                successElement.style.display = 'block';
            } else {
                field.classList.remove('success');
                field.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                successElement.style.display = 'none';
            }
        }

        /**
         * Real-time validation on input
         */
        const formFields = ['fullName', 'email', 'phone', 'password', 'confirmPassword', 'age', 'website', 'bio'];

        formFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('input', function() {
                    let validation;
                    
                    if (fieldName === 'confirmPassword') {
                        // Special validation for password confirmation
                        const password = document.getElementById('password').value;
                        const confirmPassword = this.value;
                        
                        if (confirmPassword && confirmPassword !== password) {
                            validation = { isValid: false, message: 'Passwords do not match' };
                        } else if (confirmPassword) {
                            validation = { isValid: true };
                        } else {
                            validation = { isValid: false, message: 'Please confirm your password' };
                        }
                    } else {
                        validation = validateField(fieldName, this.value);
                    }

                    showValidationFeedback(fieldName, validation.isValid, validation.message);
                });

                // Also validate on blur for better UX
                field.addEventListener('blur', function() {
                    if (this.value) {
                        this.dispatchEvent(new Event('input'));
                    }
                });
            }
        });

        /**
         * Form submission with complete validation
         */
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isFormValid = true;
            const formData = new FormData(form);

            // Validate all fields
            formFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    let validation;
                    
                    if (fieldName === 'confirmPassword') {
                        const password = formData.get('password');
                        const confirmPassword = formData.get('confirmPassword');
                        
                        if (!confirmPassword) {
                            validation = { isValid: false, message: 'Please confirm your password' };
                        } else if (confirmPassword !== password) {
                            validation = { isValid: false, message: 'Passwords do not match' };
                        } else {
                            validation = { isValid: true };
                        }
                    } else {
                        validation = validateField(fieldName, formData.get(fieldName));
                    }
                }
            });

            // If form is valid, show success message
            if (isFormValid) {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                formSuccess.style.display = 'none';
            }
        });
                    