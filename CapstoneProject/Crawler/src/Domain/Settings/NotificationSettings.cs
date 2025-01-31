namespace Domain.Settings;

public class NotificationSettings
{
    public int Id { get; set; } // Dummy primary key
    
    public string UserId { get; set; }
    
    public bool PushNotification { get; set; }
    
    public bool EmailNotification { get; set; }

    public string? EmailAddress { get; set; }
}