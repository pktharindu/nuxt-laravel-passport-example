<?php

if (! function_exists('remove_api_segment')) {
    function remove_api_segment($route)
    {
        $swapDomain = str_replace(config('app.api_url'), config('app.url'), $route);

        return preg_replace('/api\/v[0-9]+\//', '', $swapDomain);
    }
}
