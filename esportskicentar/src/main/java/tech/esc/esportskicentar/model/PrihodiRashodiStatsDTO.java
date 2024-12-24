package tech.esc.esportskicentar.model;

import lombok.*;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrihodiRashodiStatsDTO {
    private BigDecimal prihodi;
    private BigDecimal rashodi;
}
