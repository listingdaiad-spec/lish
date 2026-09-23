const menuTabs = document.querySelectorAll('.menu-tab');
const dishes = document.querySelectorAll('.dish-card');
const reserveForm = document.querySelector('#reserve-form');
const formMessage = document.querySelector('#form-message');
const dateInput = document.querySelector('input[name="date"]');

const today = new Date();
const isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

dateInput.min = isoToday;
dateInput.value = isoToday;

menuTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;

    menuTabs.forEach((item) => item.classList.toggle('active', item === tab));
    dishes.forEach((dish) => {
      dish.hidden = category !== 'all' && dish.dataset.category !== category;
    });
  });
});

reserveForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(reserveForm);
  const name = data.get('name').trim();
  const guests = data.get('guests');
  const date = data.get('date');

  formMessage.textContent = `${name}，已收到 ${date} 的 ${guests} 订位信息，我们会尽快与您确认。`;
  reserveForm.reset();
  dateInput.value = isoToday;
});
