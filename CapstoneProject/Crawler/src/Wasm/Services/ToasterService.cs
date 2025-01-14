using Application.Common.Interfaces;
using Microsoft.JSInterop;
using Shipwreck.BlazorJqueryToast;

namespace Wasm.Services;

public class ToasterService : IToasterService
{
    private readonly IJSRuntime _jsRuntime;

    public ToasterService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public void ShowSuccess(string message)
    {
        _jsRuntime.ShowToastAsync(new ToastOptions
        {
            Text = message,
            Position = ToastPosition.TopCenter,
            Heading = "Crawling Completed!"
        });
    }

    public void ShowError(string message)
    {
        _jsRuntime.ShowToastAsync(new ToastOptions
        {
            Text = message,
            Position = ToastPosition.TopCenter,
            Heading = "Crawling Failed!"
        });
    }
}