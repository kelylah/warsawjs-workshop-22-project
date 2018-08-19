import { Selector } from 'testcafe';

fixture`Stron startuje`
  .page`http://localhost:3000/`;



test('Strona wyswietla sie', async t => {

  await t
    .expect(Selector('title').textContent).eql('Wirtualny kantor')
    .expect(Selector('#root > div > header > div > h2').textContent).eql('Wirtualny kantor')
    .expect(Selector('table').visible).ok() // czy jest tabela
    .expect(Selector('[class^=MuiFormControl]').visible).ok(); // wyswietlanie formularza

});

test.only('Mozna wybrac walute', async t => {

  const hiddenBuySelector = '#buy-currency';
  const checkedCurrency = 'HUF';
  const clickableBuyCurrency = Selector(hiddenBuySelector).parent().find('[role=button]'); // [role=button] bo powinien wystepowac w kontrolce


  await t
    .click(clickableBuyCurrency);

  //.pressKey('down down down down enter') // blad bo HUF nie musi byc 4 od gory
  // .expect(Selector(hiddenBuySelector).value).eql('HUF');

  //Szukamy #menu-buy-currency potem jego potomka i sprawdzamy data-value
  const listItems = Selector('#menu-buy-currency').child('div').child('ul').find('li');

  for (let i = 0; i < 10; i++) {
    let item = await listItems.nth(i);
    let dataValue = await item.getAttribute('data-value');
    console.log(dataValue);
    if (dataValue == checkedCurrency){
      item.click();
      break;
    }
   
  }

  await t
    .expect(Selector(hiddenBuySelector).value).eql(checkedCurrency);


});

test('Mozna zmienic kwote', async t => {
  await t
    .typeText('#amount', '120', { replace: true }) //replace:true bo jak nie to do 0 dopisywalo 120 -> '0120'
    .expect(Selector('#amount').value).eql(String(120));
});

test('Mozna kupic walute', async t => {
  await t
    .typeText('#amount', '120', { replace: true }); //replace:true bo jak nie to do 0 dopisywalo 120 -> '0120'
    // Teraz klikam 'Wywolaj' i szukamy cannot submit form
});


/* Zadania
1. PageObject
2. Podmiana danych
3. Wrzucenie na Travis
4. Deploy na Heroku
*/