/**
 * CloudFront viewer-request function for clean project URLs.
 *
 * Clean request: /projects/s3-static-website -> S3 object ending in .html
 * Legacy request: /projects/s3-static-website.html -> 301 clean URL
 */
async function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (!uri.startsWith("/projects/")) {
        return request;
    }

    if (uri.endsWith(".html")) {
        return redirectTo(uri.substring(0, uri.length - 5));
    }

    if (uri.endsWith("/")) {
        return redirectTo(uri.substring(0, uri.length - 1));
    }

    var projectName = uri.substring(uri.lastIndexOf("/") + 1);

    if (projectName && !projectName.includes(".")) {
        request.uri = uri + ".html";
    }

    return request;
}

function redirectTo(location) {
    return {
        statusCode: 301,
        statusDescription: "Moved Permanently",
        headers: {
            location: { value: location }
        }
    };
}
