

// Identifies domains in a given block of text
exports.findDomains = function(text) {
	var domains = new Set();
	var exts = ['.mil', '.gov', '.edu', '.com', '.net'];
	for (ext of exts) {
		var anyFound = false;
		var split = text.split(ext);
		for (var i=0; i<split.length-1; i++) {
			var cur = split[i]
			if (i < split.length - 2 && split[i+1].charAt(0).match(/^[0-9a-zA-Z]+$/)) {
				// This accounts for cases where '.mil' appears within a domain name, i.e. msepjobs.militaryonesource.mil
				cur += ext + split[i+1];
				i++;
			}
			var arr = cur.split(/[^\w\.\-\_]/);
			var domain = arr[arr.length - 1] + ext
			if (domain == ext) continue;
			domains.add(domain);
			anyFound = true;
		}

		if(anyFound) break; // To reduce wrong domains, assume only one tld per report
	}

	return Array.from(domains);
}
