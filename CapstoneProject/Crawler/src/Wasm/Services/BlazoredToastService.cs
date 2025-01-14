using Application.Common.Interfaces;
using Blazored.Toast.Services;

namespace Wasm.Services;

public class BlazoredToastService : IToasterService
{
    private readonly IToastService _toastService;

    public BlazoredToastService(IToastService toastService)
    {
        _toastService = toastService;
    }

    public void ShowSuccess(string message)
    {
        _toastService.ShowSuccess(message);
    }

    public void ShowError(string message)
    {
        _toastService.ShowError(message);
    }
}