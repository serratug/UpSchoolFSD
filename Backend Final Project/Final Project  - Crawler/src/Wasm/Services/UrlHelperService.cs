using Application.Common.Interfaces;

namespace Wasm.Services;

public class UrlHelperService:IUrlHelperService
{
    public string ApiUrl { get; }
    public string SignalRUrl { get; }
    
    public UrlHelperService(string apiUrl, string signalRUrl)
    {
        ApiUrl = apiUrl;

        SignalRUrl = signalRUrl;
    }
}