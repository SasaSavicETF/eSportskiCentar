package tech.esc.esportskicentar.util;

import java.sql.Date;
public class Util
{
    public static boolean equalsYearMonthDay(Date date1, Date date2) {
        if (date1 == null || date2 == null) {
            return false;
        }

        return date1.getYear() == date2.getYear() &&
                date1.getMonth() == date2.getMonth() &&
                date1.getDate() == date2.getDate();
    }

}
