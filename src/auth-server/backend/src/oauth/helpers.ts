import chalk from "chalk";
import { OAuthParameters } from "./AuthorizationRequest";

export function debugPrint(data: OAuthParameters) {
    console.log(chalk.bold.yellow("OAuth Parameters"));
    paddedPrint([
        ["Client ID:", data.client_id],
        ["Redirect URI:", data.redirect_uri.toString()],
        ["Challenge:", data.code_challenge],
        ["PKCE Method:", data.code_challenge_method],
    ]);
}

function paddedPrint(entries: [string, string][]) {
    // Find the longest label length
    const maxLabelLength = Math.max(...entries.map(([label]) => label.length));

    for (const [label, value] of entries) {
        const paddedLabel = label.padEnd(maxLabelLength, " ");
        console.log(chalk.bold(paddedLabel), value);
    }
}