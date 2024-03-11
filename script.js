(function(){
    var script = {
 "layout": "absolute",
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "borderSize": 0,
 "children": [
  "this.MainViewer",
  "this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
  "this.Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
  "this.Container_FA5159DE_E8D4_E7D5_41BA_BEC555FA1DEF"
 ],
 "scripts": {
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "registerKey": function(key, value){  window[key] = value; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getKey": function(key){  return window[key]; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "unregisterKey": function(key){  delete window[key]; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "existsKey": function(key){  return key in window; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "mobileMipmappingEnabled": true,
 "width": "auto",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "paddingLeft": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "minHeight": 20,
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "backgroundPreloadEnabled": true,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 20,
 "borderRadius": 0,
 "desktopMipmappingEnabled": false,
 "gap": 10,
 "overflow": "visible",
 "shadow": false,
 "paddingTop": 0,
 "mouseWheelEnabled": true,
 "propagateClick": true,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player468"
 },
 "height": "auto",
 "class": "Player",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "vrPolyfillScale": 0.5,
 "definitions": [{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "SlideInEffect",
 "from": "bottom",
 "duration": 400,
 "id": "effect_3E13A4AC_2CAD_ACD8_419A_21E27F4F310E",
 "easing": "quad_in"
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_4459B507_5524_B502_41BD_8FFC94E77638",
 "easing": "linear"
},
{
 "partial": false,
 "label": "Guest Bedroom 3",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "id": "panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
 "class": "Panorama",
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_t.jpg",
 "hfovMax": 130,
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "hfovMax": 130,
 "label": "Kitchen",
 "id": "panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB"
  }
 ],
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_t.jpg",
 "hfovMin": "150%",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "partial": false,
 "overlays": [
  "this.overlay_B5527DA9_A726_D992_41DD_5D980F3C681F",
  "this.overlay_B53CDB81_A72B_F992_41D5_16EB6E049B28"
 ],
 "class": "Panorama",
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "partial": false,
 "label": "Guest BedRoom",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "id": "panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
 "class": "Panorama",
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_t.jpg",
 "hfovMax": 130,
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist"
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_45DB8DE7_5564_9502_41D0_7AA3C5AFD96F",
 "easing": "linear"
},
{
 "partial": false,
 "label": "Master BedRoom",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "id": "panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
 "class": "Panorama",
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_t.jpg",
 "hfovMax": 130,
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_445F7330_5523_AD1D_41D2_6FCE76D0CD98",
 "easing": "linear"
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_45025D8F_552D_9502_419D_6694005656DA",
 "easing": "linear"
},
{
 "partial": false,
 "label": "Home Office",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "id": "panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
 "class": "Panorama",
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_t.jpg",
 "hfovMax": 130,
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist"
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "partial": false,
 "label": "Sitting Room",
 "id": "panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "colCount": 7,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "height": 3584,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_t.jpg",
 "hfovMax": 130,
 "hfov": 360
},
{
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "touchControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "class": "SlideOutEffect",
 "to": "bottom",
 "duration": 400,
 "id": "effect_3E1394AC_2CAD_ACD8_41BB_D1BBC04DEC4B",
 "easing": "quad_in"
},
{
 "class": "PanoramaCamera",
 "id": "panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "partial": false,
 "label": "Guest Bedroom 2",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "id": "panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
 "class": "Panorama",
 "vfov": 180,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_t.jpg",
 "hfovMax": 130,
 "hfov": 360,
 "hfovMin": "135%"
},
{
 "class": "FadeInEffect",
 "duration": 300,
 "id": "effect_45AFC616_551D_9702_4197_DE17F8BFB338",
 "easing": "linear"
},
{
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarBackgroundColorDirection": "vertical",
 "right": 0,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "minHeight": 50,
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 100,
 "transitionDuration": 500,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "shadow": false,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "borderSize": 0,
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingLeft": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "bottom": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "layout": "absolute",
 "children": [
  "this.Label_F0600070_E96D_64E8_41D3_8B3B01F40D51"
 ],
 "id": "Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
 "left": 88,
 "borderSize": 0,
 "width": 183,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": 128,
 "height": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2
},
{
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 1,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "borderSize": 0,
 "width": 60,
 "right": 22,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467"
 ],
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 5,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "minHeight": 1,
 "top": 70,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 10,
 "gap": 0,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "class": "Container",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "backgroundColorRatios": [
  0.02
 ]
},
{
 "paddingBottom": 10,
 "id": "ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC",
 "left": "0%",
 "width": "100%",
 "itemOpacity": 1,
 "itemThumbnailShadow": true,
 "itemLabelFontFamily": "Arial",
 "horizontalAlign": "center",
 "itemHorizontalAlign": "center",
 "minHeight": 20,
 "itemBorderRadius": 0,
 "itemLabelPosition": "bottom",
 "verticalAlign": "top",
 "itemThumbnailBorderRadius": 50,
 "itemPaddingLeft": 3,
 "backgroundOpacity": 0,
 "height": "20.951%",
 "itemThumbnailShadowSpread": 1,
 "paddingRight": 20,
 "playList": "this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist",
 "minWidth": 20,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadow": false,
 "propagateClick": false,
 "itemBackgroundColorRatios": [
  0.58,
  0.92
 ],
 "class": "ThumbnailList",
 "rollOverItemBackgroundOpacity": 0,
 "itemVerticalAlign": "middle",
 "rollOverItemLabelFontWeight": "normal",
 "scrollBarMargin": 2,
 "layout": "horizontal",
 "itemBackgroundOpacity": 0,
 "borderSize": 0,
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#C0C0C0",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontColor": "#79675E",
 "paddingLeft": 20,
 "itemThumbnailShadowHorizontalLength": 3,
 "scrollBarWidth": 10,
 "itemThumbnailHeight": 75,
 "itemThumbnailShadowBlurRadius": 8,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "itemPaddingRight": 3,
 "itemThumbnailOpacity": 1,
 "bottom": "2.29%",
 "itemLabelFontColor": "#36454F",
 "itemBackgroundColorDirection": "vertical",
 "borderRadius": 5,
 "click": "this.setComponentVisibility(this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1, true, 0, null, null, false)",
 "itemThumbnailShadowOpacity": 0,
 "itemThumbnailWidth": 75,
 "gap": 0,
 "itemPaddingBottom": 3,
 "paddingTop": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemThumbnailShadowColor": "#000000",
 "itemLabelFontStyle": "normal",
 "itemLabelGap": 9,
 "itemThumbnailShadowVerticalLength": 3,
 "itemLabelHorizontalAlign": "center",
 "visible": false,
 "selectedItemLabelFontWeight": "bold",
 "itemMode": "normal"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---INFO photo"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PANORAMA LIST"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---LOCATION"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---FLOORPLAN"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PHOTOALBUM"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "right": "0%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "verticalAlign": "top",
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---REALTOR"
 },
 "class": "Container",
 "creationPolicy": "inAdvance",
 "visible": false,
 "paddingBottom": 0,
 "scrollBarColor": "#04A3E1"
},
{
 "layout": "horizontal",
 "children": [
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "borderSize": 3,
 "width": 210,
 "right": "0.6%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "borderColor": "#79675E",
 "top": "0.94%",
 "minHeight": 1,
 "height": 55,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 15,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 3,
 "overflow": "scroll",
 "propagateClick": true,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.7,
 "data": {
  "name": "-button set container"
 },
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2
},
{
 "fontColor": "#FFFFFF",
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": "4.16%",
 "borderSize": 0,
 "width": 224,
 "fontFamily": "Maiandra GD",
 "paddingLeft": 0,
 "text": "Nestopia VT.",
 "minHeight": 1,
 "horizontalAlign": "left",
 "top": "0%",
 "bottom": "93.72%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontStyle": "normal",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "fontSize": 31,
 "textDecoration": "none",
 "class": "Label",
 "data": {
  "name": "Label Company Name"
 },
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "id": "Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
 "left": "1.63%",
 "borderSize": 0,
 "maxWidth": 40,
 "width": "2.413%",
 "maxHeight": 30,
 "paddingLeft": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "url": "skin/Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50.png",
 "top": "1.15%",
 "bottom": "95.71%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "logo"
 },
 "class": "Image",
 "paddingBottom": 0
},
{
 "fontColor": "#FFFFFF",
 "id": "Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
 "left": 53,
 "borderSize": 0,
 "width": 228,
 "fontFamily": "Maiandra GD",
 "paddingLeft": 0,
 "textShadowColor": "#36454F",
 "text": "Vision Apts.",
 "minHeight": 1,
 "horizontalAlign": "left",
 "top": 78,
 "height": 53,
 "textShadowHorizontalLength": 3,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "textShadowBlurRadius": 30,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontStyle": "normal",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "textShadowOpacity": 1,
 "fontSize": "4.19vmin",
 "textDecoration": "none",
 "class": "Label",
 "paddingBottom": 0,
 "data": {
  "name": "text 2"
 },
 "fontWeight": "bold",
 "textShadowVerticalLength": 0
},
{
 "layout": "vertical",
 "children": [
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
  "this.IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
  "this.IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
  "this.IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52"
 ],
 "scrollBarMargin": 2,
 "id": "Container_FA5159DE_E8D4_E7D5_41BA_BEC555FA1DEF",
 "left": "1.2%",
 "borderSize": 0,
 "width": "7.057%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "bottom": "17.64%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "height": "56.781%",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "gap": 5,
 "overflow": "visible",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container14356"
 },
 "class": "Container",
 "paddingBottom": 0
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "borderSize": 0,
 "width": 60,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "pressedIconHeight": 30,
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 30,
 "minHeight": 1,
 "pressedIconWidth": 30,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 44,
 "paddingRight": 0,
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "borderColor": "#000000",
 "mode": "toggle",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "iconWidth": 30
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "borderSize": 0,
 "width": 59,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "pressedIconHeight": 30,
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 30,
 "minHeight": 1,
 "pressedIconWidth": 30,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 65,
 "paddingRight": 0,
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "borderColor": "#000000",
 "mode": "toggle",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "data": {
  "name": "Button Settings Mute"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "iconWidth": 30
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.19,
   "yaw": 22.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_2_0.png",
      "width": 40,
      "height": 40
     }
    ]
   },
   "pitch": -2.82,
   "hfov": 7.19,
   "yaw": 22.66
  }
 ],
 "id": "overlay_B5527DA9_A726_D992_41DD_5D980F3C681F",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "hfov": 7.18,
   "yaw": -65.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.09
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_3_0.png",
      "width": 40,
      "height": 40
     }
    ]
   },
   "pitch": -4.09,
   "hfov": 7.18,
   "yaw": -65.26
  }
 ],
 "id": "overlay_B53CDB81_A72B_F992_41D5_16EB6E049B28",
 "data": {
  "label": "Image"
 },
 "enabledInCardboard": true
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "borderSize": 0,
 "width": 56,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "pressedIconHeight": 30,
 "rollOverBackgroundColor": [
  "#36454F"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 30,
 "minHeight": 1,
 "pressedIconWidth": 30,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 59,
 "paddingRight": 0,
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "borderColor": "#000000",
 "mode": "toggle",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#666666"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "rollOverIconWidth": 30,
 "data": {
  "name": "Button Settings HS"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverIconHeight": 30,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "iconWidth": 30
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "borderSize": 0,
 "width": 60,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "pressedIconHeight": 30,
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 30,
 "minHeight": 1,
 "pressedIconWidth": 30,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 54,
 "paddingRight": 0,
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "borderColor": "#000000",
 "mode": "toggle",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "rollOverIconWidth": 30,
 "data": {
  "name": "Button Settings Gyro"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "rollOverIconHeight": 30,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "iconWidth": 30
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "borderSize": 0,
 "width": 60,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 30,
 "minHeight": 1,
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 52,
 "paddingRight": 0,
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "borderColor": "#000000",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "data": {
  "name": "Button settings VR"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#79675E"
 ],
 "iconWidth": 30
},
{
 "fontColor": "#FFFFFF",
 "id": "Label_F0600070_E96D_64E8_41D3_8B3B01F40D51",
 "borderSize": 0,
 "width": 165,
 "fontFamily": "Maiandra GD",
 "right": "0%",
 "paddingLeft": 0,
 "textShadowColor": "#36454F",
 "text": "Kahawa Wendani",
 "minHeight": 1,
 "horizontalAlign": "left",
 "top": 7,
 "height": 21,
 "textShadowHorizontalLength": 3,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "textShadowBlurRadius": 30,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontStyle": "normal",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "textShadowOpacity": 1,
 "fontSize": "1.98vmin",
 "textDecoration": "none",
 "class": "Label",
 "paddingBottom": 0,
 "data": {
  "name": "text 2"
 },
 "fontWeight": "normal",
 "textShadowVerticalLength": 0
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "borderSize": 0,
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "10%",
 "bottom": "80%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "paddingRight": 20,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 20,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "class": "Container",
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2,
 "paddingBottom": 0
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "borderSize": 0,
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "10%",
 "bottom": "80%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "paddingRight": 20,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 20,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "class": "Container",
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2,
 "paddingBottom": 0
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "shadowSpread": 1,
 "top": "10%",
 "shadowBlurRadius": 25,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowHorizontalLength": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "class": "Container",
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "shadowVerticalLength": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "79.28%",
 "borderSize": 0,
 "right": "15.36%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "minHeight": 1,
 "top": "9.97%",
 "bottom": "81.78%",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "paddingRight": 20,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 20,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "class": "Container",
 "scrollBarColor": "#000000",
 "scrollBarMargin": 2,
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "popUpPaddingTop": 10,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "borderSize": 0,
 "width": 128,
 "fontFamily": "Montserrat",
 "popUpFontColor": "#FFFFFF",
 "fontColor": "#FFFFFF",
 "popUpShadowBlurRadius": 6,
 "popUpShadowSpread": 1,
 "paddingLeft": 15,
 "pressedBackgroundColorRatios": [
  0
 ],
 "popUpPaddingBottom": 10,
 "popUpShadowOpacity": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#36454F"
 ],
 "arrowColor": "#FFFFFF",
 "popUpPaddingLeft": 15,
 "minHeight": 1,
 "popUpBorderRadius": 5,
 "rollOverPopUpBackgroundColor": "#666666",
 "arrowBeforeLabel": false,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": "72.917%",
 "paddingRight": 15,
 "label": "ROOMS",
 "minWidth": 1,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "popUpShadowColor": "#000000",
 "borderRadius": 5,
 "popUpBackgroundColor": "#79675E",
 "fontStyle": "normal",
 "gap": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "selectedPopUpBackgroundColor": "#36454F",
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "popUpBackgroundOpacity": 1,
 "data": {
  "name": "DropDown 2"
 },
 "fontSize": 12,
 "textDecoration": "none",
 "class": "DropDown",
 "paddingBottom": 0,
 "popUpShadow": false,
 "fontWeight": "bold",
 "backgroundColorRatios": [
  0
 ],
 "popUpGap": 2
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "borderSize": 0,
 "width": 54,
 "fontFamily": "Arial",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 17,
 "minHeight": 1,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "height": 47,
 "paddingRight": 0,
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "borderColor": "#000000",
 "mode": "toggle",
 "minWidth": 1,
 "borderRadius": 10,
 "iconBeforeLabel": true,
 "fontStyle": "normal",
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "data": {
  "name": "Button Settings"
 },
 "fontSize": 12,
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "iconWidth": 17
},
{
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, this.effect_45025D8F_552D_9502_419D_6694005656DA, 'showEffect', false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Realtor"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, this.effect_4459B507_5524_B502_41BD_8FFC94E77638, 'showEffect', false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Location"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B.png",
 "rollOverIconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, this.effect_45AFC616_551D_9702_4197_DE17F8BFB338, 'showEffect', false); this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Floorplan"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, this.effect_445F7330_5523_AD1D_41D2_6FCE76D0CD98, 'showEffect', false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); if(!this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC.get('visible')){ this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_3E13A4AC_2CAD_ACD8_419A_21E27F4F310E, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_3E1394AC_2CAD_ACD8_41BB_D1BBC04DEC4B, 'hideEffect', false) }",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Thumblist"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Video"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 101,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "borderSize": 0,
 "width": 44,
 "maxHeight": 101,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 1,
 "height": 44,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, this.effect_45DB8DE7_5564_9502_41D0_7AA3C5AFD96F, 'showEffect', false); this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton Info"
 },
 "class": "IconButton",
 "visible": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "borderSize": 0,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "width": "85%",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "borderSize": 0,
 "width": 8,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "dark sandy beige line"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "backgroundColorRatios": [
  0
 ]
},
{
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "borderSize": 0,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "width": "50%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 50,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#F5DEB3",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 50,
 "minWidth": 460,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "visible",
 "shadow": false,
 "paddingTop": 20,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 20,
 "scrollBarColor": "#0069A3"
},
{
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "borderSize": 0,
 "width": "25%",
 "maxHeight": 60,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 50,
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "height": "75%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.png",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "cursor": "hand"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "borderSize": 0,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": 140,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "verticalAlign": "top",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "paddingBottom": 70,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "itemMaxWidth": 1000,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "itemMaxHeight": 1000,
 "itemOpacity": 1,
 "width": "100%",
 "itemThumbnailShadow": false,
 "itemLabelFontFamily": "Montserrat",
 "horizontalAlign": "center",
 "itemHorizontalAlign": "center",
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "itemLabelPosition": "bottom",
 "verticalAlign": "middle",
 "itemThumbnailBorderRadius": 0,
 "itemPaddingLeft": 3,
 "backgroundOpacity": 0,
 "height": "92%",
 "paddingRight": 70,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "minWidth": 1,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "shadow": false,
 "propagateClick": false,
 "itemBackgroundColorRatios": [],
 "itemWidth": 220,
 "class": "ThumbnailGrid",
 "itemMinHeight": 50,
 "scrollBarMargin": 2,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemVerticalAlign": "top",
 "itemBackgroundOpacity": 0,
 "borderSize": 0,
 "itemLabelTextDecoration": "none",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "rollOverItemLabelFontColor": "#F7931E",
 "itemLabelFontWeight": "normal",
 "selectedItemLabelFontColor": "#F7931E",
 "paddingLeft": 70,
 "itemHeight": 160,
 "scrollBarWidth": 10,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 13,
 "itemPaddingRight": 3,
 "itemThumbnailOpacity": 1,
 "bottom": -0.2,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemMinWidth": 50,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "borderRadius": 5,
 "itemThumbnailWidth": 220,
 "scrollBarColor": "#F7931E",
 "gap": 26,
 "selectedItemThumbnailShadow": true,
 "itemLabelGap": 7,
 "paddingTop": 10,
 "scrollBarVisible": "rollOver",
 "itemPaddingBottom": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelFontStyle": "normal",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelHorizontalAlign": "center",
 "selectedItemLabelFontWeight": "bold",
 "itemMode": "normal"
},
{
 "backgroundColorDirection": "vertical",
 "insetBorder": false,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "borderSize": 0,
 "width": "100%",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "scrollEnabled": true,
 "minHeight": 1,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "data": {
  "name": "WebFrame48191"
 },
 "class": "WebFrame",
 "paddingBottom": 0
},
{
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "borderSize": 0,
 "width": "25%",
 "maxHeight": 60,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 50,
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "height": "75%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.png",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "cursor": "hand"
},
{
 "toolTipOpacity": 1,
 "id": "MapViewer",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "minHeight": 1,
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "transitionDuration": 500,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "borderSize": 0,
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingLeft": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "toolTipBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Floor Plan"
 },
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "layout": "absolute",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "scrollBarMargin": 2,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "borderSize": 0,
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "height": 140,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "class": "Container",
 "paddingBottom": 0
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "borderSize": 0,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "visible",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "borderSize": 0,
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "width": "55%",
 "backgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "borderSize": 0,
 "width": 10,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "backgroundColorRatios": [
  0
 ]
},
{
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "borderSize": 0,
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A"
 ],
 "width": "45%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 60,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 60,
 "minWidth": 460,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "visible",
 "shadow": false,
 "paddingTop": 20,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 20,
 "scrollBarColor": "#0069A3"
},
{
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "borderSize": 0,
 "width": "25%",
 "maxHeight": 60,
 "paddingLeft": 0,
 "horizontalAlign": "center",
 "minHeight": 50,
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "height": "75%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.png",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "cursor": "hand"
},
{
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 1000,
 "paddingLeft": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "top": "0%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "height": "100%",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "photo"
 },
 "class": "Image",
 "paddingBottom": 0
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "borderSize": 0,
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "horizontalAlign": "right",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": 60,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 20,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "verticalAlign": "top",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "backgroundColorDirection": "horizontal",
 "scrollBarMargin": 2,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "borderSize": 0,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "width": "100%",
 "backgroundColorRatios": [
  0,
  0.88
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "height": "100%",
 "class": "Container",
 "paddingBottom": 30,
 "scrollBarColor": "#E73B2C"
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "borderSize": 0,
 "width": 370,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": 40,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "verticalAlign": "top",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ]
},
{
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 60,
 "right": 20,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "height": "36.14%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.png",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "cursor": "hand"
},
{
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 60,
 "right": 20,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "height": "36.14%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.png",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "cursor": "hand"
},
{
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "minHeight": 1,
 "progressBarBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "transitionDuration": 500,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipShadowHorizontalLength": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "borderSize": 0,
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingLeft": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "progressBorderSize": 0,
 "top": "0%",
 "toolTipBorderSize": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "cursor": "hand",
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "borderSize": 0,
 "maxWidth": 60,
 "width": "14.22%",
 "maxHeight": 60,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "center",
 "top": "20%",
 "bottom": "20%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "class": "IconButton",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "paddingBottom": 0
},
{
 "cursor": "hand",
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "borderSize": 0,
 "width": "14.22%",
 "maxHeight": 60,
 "right": 10,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "center",
 "top": "20%",
 "bottom": "20%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "class": "IconButton",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "paddingBottom": 0
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "borderSize": 0,
 "width": "10%",
 "maxHeight": 60,
 "right": 20,
 "paddingLeft": 0,
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "height": "10%",
 "paddingRight": 0,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.png",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.png",
 "mode": "push",
 "minWidth": 50,
 "borderRadius": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "class": "IconButton",
 "paddingBottom": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "cursor": "hand"
},
{
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 1000,
 "paddingLeft": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "top": "0%",
 "verticalAlign": "bottom",
 "backgroundOpacity": 0,
 "height": "100%",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "class": "Image",
 "paddingBottom": 0
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "borderSize": 0,
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "horizontalAlign": "right",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "height": 60,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 0,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 20,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "verticalAlign": "top",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "borderSize": 0,
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "height": "91.713%",
 "class": "Container",
 "paddingBottom": 30,
 "scrollBarColor": "#E73B2C"
},
{
 "shadowVerticalLength": 0,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "borderSize": 20,
 "width": "100%",
 "shadowColor": "#000000",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "height": "100%",
 "shadowHorizontalLength": 3,
 "backgroundOpacity": 0,
 "shadowOpacity": 0,
 "paddingRight": 10,
 "borderColor": "#FFFFFF",
 "minWidth": 1,
 "borderRadius": 40,
 "propagateClick": false,
 "shadow": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText"
 },
 "class": "HTMLText",
 "paddingBottom": 20,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.17vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:0.88vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.22vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.22vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.22vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.88vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.88vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:1.76vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "scrollBarColor": "#F7931E"
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "borderSize": 0,
 "width": 180,
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "minHeight": 1,
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#79675E"
 ],
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 0.8,
 "height": 50,
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "borderColor": "#000000",
 "mode": "push",
 "minWidth": 1,
 "borderRadius": 0,
 "label": "LOREM IPSUM",
 "fontStyle": "normal",
 "gap": 5,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "data": {
  "name": "Button Lorem Ipsum"
 },
 "fontSize": "1.96vh",
 "verticalAlign": "middle",
 "class": "Button",
 "paddingBottom": 0,
 "fontWeight": "bold",
 "rollOverBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "pressedBackgroundColor": [
  "#36454F"
 ],
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "borderSize": 0,
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "18.612%",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#04A3E1",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText18899"
 },
 "class": "HTMLText",
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:3.42vh;font-family:'Maiandra GD';\"><U>REALTOR</U></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.22vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Maiandra GD';\"><B>VISION APARTMENTS</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.76vh;font-family:'Maiandra GD';\"><B>Kahawa Wendani</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>"
},
{
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "borderSize": 0,
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "height": "48.795%",
 "class": "Container",
 "paddingBottom": 0,
 "scrollBarColor": "#000000"
},
{
 "maxWidth": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "borderSize": 0,
 "width": "22.864%",
 "maxHeight": 200,
 "paddingLeft": 0,
 "horizontalAlign": "left",
 "minHeight": 1,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "height": "56.958%",
 "paddingRight": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "shadow": false,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "class": "Image",
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "borderSize": 0,
 "width": "74.623%",
 "scrollBarVisible": "rollOver",
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "93.77%",
 "backgroundOpacity": 0,
 "paddingRight": 10,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#F7931E",
 "shadow": false,
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText19460"
 },
 "class": "HTMLText",
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:1.1vh;font-family:'Montserrat';\"><B>KELVIN MURIITHI</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.1vh;font-family:'Montserrat';\">LICENCED SURVEYOR</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.88vh;font-family:'Montserrat';\"><B>Tel: 0741581776</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.88vh;font-family:'Montserrat';\"><B>Email: geokevsurveys@gmail.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.88vh;font-family:'Montserrat';\"><B>Web: www.nestopiagroup.co.ke</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.22vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.1vh;font-family:'Maiandra GD';\">Experience luxury living at Vision Apartments in Kahawa Wendani. Our contemporary residences offer unparalleled comfort and style. Enjoy spacious interiors, modern amenities, and stunning views. Immerse yourself in a vibrant community with convenient access to shopping, dining, and entertainment. Elevate your lifestyle at Vision Apartments \u2013 where vision meets reality.</SPAN></SPAN></DIV></div>"
}]
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
