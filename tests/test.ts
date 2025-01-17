import { expect, test } from "@playwright/test";

test("create rec roll", async ({ page }) => {
	await page.goto("/");

	const form = page.getByTestId("create-roll-form");
	await form.getByPlaceholder("eg. coffee places in sg,").fill("Easy recipes");
	await form.getByRole("button", { name: "create" }).click();

	await expect(page).toHaveURL(/.*\/rolls\/\d+/);
	await expect(page.locator("h1")).toContainText("Easy recipes");
});

test("create rec", async ({ page }) => {
	await page.goto("/rolls/6");

	const form = page.getByTestId("create-rec-form");
	const name = "Pasta with Tomato Sauce";
	const rating = "4";
	const url = "https://example.com/pasta-recipe";
	const description = "A simple and delicious pasta recipe.";

	await form.locator('input[name="name"]').fill(name);
	await form.locator('input[name="rating"]').fill(rating);
	await form.locator('input[name="url"]').fill(url);
	await form.locator('textarea[name="description"]').fill(description);
	await form.getByRole("button", { name: "save rec" }).click();

	const recs = page.getByTestId("recs");
	await expect(recs).toContainText(name);

	// Check for rating symbol instead of the number, since that's what's displayed
	await expect(recs).toContainText("🔥");

	await expect(recs).toContainText(url);
	await expect(recs).toContainText(description);
});
