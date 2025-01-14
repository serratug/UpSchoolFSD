using Domain.Enums;

namespace Application.Features.Orders.Queries.GetById;

public class OrderGetByIdDto
{
    public Guid Id { get; set; }
    
    public string UserId { get; set; }
    
    public ProductAmountChoice ProductAmountChoice { get; set; }
    
    public int RequestedAmount { get; set; }
    
    public int TotalFoundAmount { get; set; }
    
    public ProductCrawlType ProductCrawlType { get; set; }

    public DateTimeOffset CreatedOn { get; set; }
    
    public string? CreatedByUserId { get; set; }
}