package net.webius.randomlunchfood.utils;

import java.util.Random;

public class StringBuilderUtils {
	public static String getRandomString(int size) {
		return (new Random())
				.ints(size, 48, 123)
				.filter(n -> (n <= 57 || n >= 65) && (n <= 90 || n >= 97))
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();
	}
}
