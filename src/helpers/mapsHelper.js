import React from 'react';
import { Linking, Platform } from 'react-native';

export function open({latitude, longitude, zoomLevel, provider, pointName, address}) {
	// Execute link
	createOpenLink({latitude, longitude, zoomLevel, provider,pointName, address})();
}

export function createOpenLink({latitude, longitude, zoomLevel = 15, provider, pointName, address}) {
	if (!provider) {
		defaultProvider = (Platform.OS === 'ios') ? 'apple' : 'google';
	}

	const mapProvider = provider || defaultProvider;
	// Allow override provider, otherwise use the default provider
	const mapLink = createMapLink({latitude, longitude, zoomLevel, provider:  mapProvider, pointName, address});

	// Returns a delayed function that opens when executed
	return () => Linking.openURL(mapLink).catch(err => console.error('An error occurred', err));
}

export function createMapLink({latitude, longitude, zoomLevel = 15, provider = 'google', pointName = '', address = ''}) {
	const link = {
		'google': `http://maps.google.com/maps?q=${latitude},${longitude},${address},${pointName}&z=${zoomLevel}`,
		'apple': `http://maps.apple.com/?sll=${latitude},${longitude}&z=${zoomLevel}&address=${address}&q=${pointName}`
	};

	return link[provider];
}
