'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.languageLevel
 * @description
 * # languageLevel
 * Constant in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .constant('languageLevel', [
  		{
  			level: 0,
  			desc: 'cannot speak or read'
  		},
  		{
  			level: 1,
  			desc: 'very basic speaking and reading. very limited vocabulary'
  		},
  		{
  			level: 2,
  			desc: 'limited proficiency. can satisfy routine demands in speaking and reading'
  		},
  		{
  			level: 3,
  			desc: 'passable language skills. sufficient vocabulary, knowledge of grammar and speaking ability for basic understanding in the majority of situations'
  		},
  		{
  			level: 4,
  			desc: 'fluent and accurate use of the language for all educational or professional needs'
  		},
  		{
  			level: 5,
  			desc: 'bilingual. equivalent to that of an educated native speaker'
  		}
  	]);
