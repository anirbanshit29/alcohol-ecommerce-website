/**
 * Format a number as Indian Rupee currency
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number with Indian comma notation (e.g., 1,45,320)
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format a date string to readable format
 * @param {string} dateStr - ISO date string
 * @param {'short'|'long'|'relative'} format
 * @returns {string}
 */
export const formatDate = (dateStr, format = 'short') => {
  const date = new Date(dateStr);

  if (format === 'relative') {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  if (format === 'long') {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Validate Indian phone number
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/[\s\-+]/g, '');
  return /^(91)?[6-9]\d{9}$/.test(cleaned);
};

/**
 * Validate Indian PIN code
 * @param {string} pincode
 * @returns {boolean}
 */
export const isValidPincode = (pincode) => /^[1-9]\d{5}$/.test(pincode);

/**
 * Validate email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay - Milliseconds
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Truncate a string with ellipsis
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export const truncate = (str, maxLen = 50) => {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
};

/**
 * Get discount percentage between two prices
 * @param {number} original
 * @param {number} current
 * @returns {number}
 */
export const getDiscountPercent = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

/**
 * Generate a random order ID
 * @returns {string}
 */
export const generateOrderId = () => {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ORD${rand}`;
};

/**
 * Capitalize first letter
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get initials from a name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

/**
 * Classname helper — filters falsy values and joins
 * @param  {...string} classes
 * @returns {string}
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
