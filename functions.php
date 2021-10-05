<?php

/**
 * <title>タグを出力する
 */
add_theme_support('title-tag');

/**
 * タイトルタグの区切り文字をエン・ダッシュから縦線に変更する
 */
add_filter('document_title_separator', 'my_document_title_separator');
function my_document_title_separator($separator)
{
    $separator = '|';
    return $separator;
}

/**
 * タイトルタグのテキストを変更する
 */
add_filter('document_title_parts', 'my_document_title_parts');

function my_document_title_parts($title)
{
    if (is_home()) {
        unset($title['tagline']); // タグラインを削除
        $title['title'] = 'note.dev'; //テキストを変更
    }
    return $title;
}

/**
 * アイキャッチ画像を使用可能にする
 */
add_action('init', function() {
    add_theme_support('post-thumbnails');
});

/**
 * カスタムメニュー機能を使用可能にする
 */
add_theme_support('menus');

/**
 * 抜粋文字数制限
 */

function twpp_change_excerpt_length($length)
{
    return 120;
}

add_filter('excerpt_length', 'twpp_change_excerpt_length', 999);


/**
 * サイドウィジェット登録
 */
function my_theme_widgets_init() {
    register_sidebar( array(
        'name' => 'Main Sidebar',
        'id' => 'main-sidebar',
    ) );
}
add_action( 'widgets_init', 'my_theme_widgets_init' );


/**
 * コメントの項目を変更する
 */
add_filter('comment_form_default_fields', 'my_comment_form_default_fields');
function my_comment_form_default_fields($args)
{
    $args['author'] = ''; // 「名前」を削除
    $args['email'] = ''; // 「メールアドレス」を削除
    $args['url'] = ''; // 「サイト」を削除
    return $args;
}


function h($str)
{
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

/**
 * アイキャッチ画像がなければ、標準画像を取得する
 */
function get_eyecatch_with_default() {
    if(has_post_thumbnail()):
        $id = get_post_thumbnail_id();
        $img = wp_get_attachment_image_src($id, 'full');
    else:
        $img = array(get_template_directory_uri() . '/dist/assets/images/noimage.jpg');
    endif;
    return $img;
}


/**
 * 検索結果に固定ページを表示させない
 */
function my_posy_search($search) {
    if(is_search()) {
        $search .= " AND post_type = 'post'";
    }
    return $search;
}
add_filter('posts_search', 'my_posy_search');



/**
 * wp_nav_menuのli要素にclassを追加するソース
 */
function add_additional_class_on_li($classes, $item, $args) {
    if(isset($args->add_li_class)) {
        $classes[] = $args->add_li_class;
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_additional_class_on_li', 1, 3);


/**
 * wp_nav_menuのメニュー下に説明を表示する
 */
function prefix_nav_description( $item_output, $item, $depth, $args ) {
    if ( !empty( $item->description ) ) {
    $item_output = str_replace( '">' . $args->link_before . $item->title, '">' . $args->link_before . '<p>' . $item->title . '</p>' . '<span class="menu-item-description">' . $item->description . '</span>' , $item_output );
    }
    return $item_output;
   }
add_filter( 'walker_nav_menu_start_el', 'prefix_nav_description', 10, 4 );

/**
 * ページネーションのHTMLカスタマイズ
 */
function custom_pagination_html( $template ) {
    $template = '
    <nav class="pagination" role="navigation">
        <h3 class="screen-reader-text">%2$s</h3>
        %3$s
    </nav>';
    return $template;
}
add_filter('navigation_markup_template','custom_pagination_html');


/**
 * 固定ページで抜粋を使えるようにする
 */
add_post_type_support( 'page', 'excerpt' );


/**
 * 投稿記事表示数
 */
function change_posts_per_page($query) {
    /* 管理画面,メインクエリに干渉しないために必須 */
    if ( is_admin() || ! $query->is_main_query() ){
        return;
    }

    /* カテゴリーページの表示件数を5件にする */
    if ( $query->is_home() ) {
        $query->set( 'posts_per_page', '12' );
        return;
    }

    }
    add_action( 'pre_get_posts', 'change_posts_per_page' );
