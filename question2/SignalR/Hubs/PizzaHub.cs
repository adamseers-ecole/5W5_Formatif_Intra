using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            _pizzaManager.AddUser();
            await Clients.Caller.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            _pizzaManager.RemoveUser();
            await Clients.Caller.SendAsync("unselectChoice", _pizzaManager.NbConnectedUsers);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            await Clients.Caller.SendAsync("UpdateMoney", _pizzaManager.Money);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.NbPizzas, _pizzaManager.Money);
            await Clients.Caller.SendAsync("UpdatePizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);
        }
    }
}
